import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState as Observable<User | null>;
  }

  async getCurrentUserPromise(): Promise<User | null> {
    return (await this.afAuth.currentUser) as User | null;
  }

  // ✅ This is what you need to get the username
  async getUsername(): Promise<string> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const doc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      const data = doc?.data() as { username?: string; displayName?: string } | undefined;
      return data?.username || data?.displayName || user.displayName || 'Anonymous';
    } else {
      return 'Guest';
    }
  }
  
}
