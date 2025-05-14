import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  username: string = '';


  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}
 
  signupSuccess: boolean = false;
  signupError: string | null = null;
  
  async signUp() {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
  
      if (result.user) {
        await this.firestore.collection('users').doc(result.user.uid).set({
          username: this.username,
          email: this.email,
          createdAt: new Date(),
        });
  
        this.signupSuccess = true;
        this.signupError = null;
        console.log('User signed up and username saved:', result);
      }
    } catch (error: any) {
      this.signupSuccess = false;
      this.signupError = error.message;
      console.error('Error signing up:', error);
    }
  }
  
  
  
}
