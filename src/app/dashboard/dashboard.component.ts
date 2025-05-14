import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] 
})
export class DashboardComponent implements OnInit {
  user: any = null;
  assignments: any[] = [];
  schedules: any[] = [];
  posts: any[] = [];
  loading: boolean = true;
  
  username: string = '';
  email: string = '';
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    // 1. Subscribe to auth state to get current user UID:contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}
    this.afAuth.authState.subscribe(authUser => {
      if (authUser) {
        const uid = authUser.uid;

        // 2. Fetch Firestore user document (users collection) for profile data
        this.afs.collection('users').doc(uid).valueChanges().subscribe((userData: any) => {
          this.user = userData; 
          this.username = userData?.username || '';
          this.email = userData?.email || '';      // contains username, email fields
          this.loading = false;       // stop loading when user data arrives
        });

        // 3. Fetch assignments where createdBy == current UID:contentReference[oaicite:6]{index=6}
        this.db.list('assignments', ref =>
          ref.orderByChild('createdBy').equalTo(uid)
        ).valueChanges().subscribe(list => {
          this.assignments = list;    // each item has { title, dueDate, createdBy, ... }
        });

        // 4. Fetch all schedules
        this.db.list('schedules').valueChanges().subscribe(list => {
          this.schedules = list.slice(-3).reverse();       // each item has { subject, time, ... }
        });

        // 5. Fetch all posts
        this.db.list('posts').valueChanges().subscribe(list => {
          this.posts = list.slice(-3).reverse();          // each item has { title, content, ... }
        });
      }
    });
  }
}
