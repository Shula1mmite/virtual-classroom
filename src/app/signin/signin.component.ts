import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async signIn() {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Sign-in successful:', user);
      this.router.navigate(['/home']); // Redirect to home page after successful login
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Invalid email or password. Please try again.');
    }
  }
}
