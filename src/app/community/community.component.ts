import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeDatabaseService } from '../services/realtime-database.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

interface Comment {
  username: string;
  commentText: string;
  timestamp: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  userId: string;
  timestamp: number;
  category: string;
  comments: Comment[];
  firebaseKey?: string;
  showCommentInput?: boolean;
  showComments?: boolean;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit, OnDestroy {
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  newPost = { title: '', content: '', category: '' };
  newCommentText: { [key: string]: string } = {};
  currentUserId: string = '';
  selectedCategory: string = 'General Discussions';
  userSubscription: Subscription | undefined;
  postsSubscription: Subscription | undefined;

  constructor(
    private dbService: RealtimeDatabaseService,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  getCurrentUser() {
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });
  }

  fetchPosts() {
    this.postsSubscription = this.db.list('posts').snapshotChanges().pipe(
      switchMap(changes => {
        return forkJoin(
          changes.map(c => {
            const firebaseKey = c.payload.key!;
            const postData = c.payload.val() as Post;
            const post: Post = {
              ...postData,
              firebaseKey,
              comments: [],
              showComments: false,
            };
            return this.db.object(`posts/${firebaseKey}/comments`).valueChanges().pipe(
              take(1),
              map((comments: any) => {
                const commentsArray: Comment[] = comments ? Object.values(comments) : [];
                return { ...post, comments: commentsArray };
              })
            );
          })
        );
      })
    ).subscribe(posts => {
      this.allPosts = posts;
      this.filterPostsByCategory(this.selectedCategory);
    });
  }

  filterPostsByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredPosts = category === 'All'
      ? this.allPosts
      : this.allPosts.filter(post => post.category === category);
  }

  createPost() {
    this.authService.getCurrentUser().subscribe(async user => {
      if (user) {
        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        const userData = userDoc?.data() as { username?: string };
        const username = userData?.username || 'Anonymous';

        const timestamp = Date.now();

        const newPost: Post = {
          ...this.newPost,
          id: timestamp,
          timestamp,
          userId: user.uid,
          username: username,
          comments: [],
          showComments: false,
        };

        const postRef = await this.db.list('posts').push(newPost);
        const firebaseKey = postRef.key;

        if (firebaseKey) {
          await this.db.object(`posts/${firebaseKey}`).update({ firebaseKey });
          this.newPost = { title: '', content: '', category: '' };
          this.fetchPosts();
        }
      }
    });
  }

  toggleCommentInput(postId: number) {
    const post = this.allPosts.find(p => p.id === postId);
    if (post) {
      post.showCommentInput = !post.showCommentInput;
    }
  }

  addComment(firebaseKey: string) {
    if (!firebaseKey) {
      console.error('firebaseKey is undefined or null');
      return;
    }
    const commentText = this.newCommentText[firebaseKey]?.trim();
    if (!commentText) return;

    this.authService.getCurrentUser().subscribe(async user => {
      if (user) {
        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        const userData = userDoc?.data() as { username?: string };
        const username = userData?.username || 'Anonymous';

        const post = this.allPosts.find(p => p.firebaseKey === firebaseKey);
        if (!post || !post.firebaseKey) return;

        const newComment: Comment = {
          username,
          commentText,
          timestamp: Date.now(),
        };

        this.dbService.addData(`posts/${post.firebaseKey}/comments`, newComment)
          .then(() => {
            post.comments.push(newComment);
            this.newCommentText[firebaseKey] = '';
            this.fetchPosts();
          })
          .catch(error => console.error('Error adding comment:', error));
      }
    });
  }
  toggleComments(postId: number): void {
    const post = this.allPosts.find(p => p.id === postId);
    if (post) {
      post.showComments = !post.showComments;
    }
  }
  

}
