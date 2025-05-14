import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      console.log('Password reset email sent.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
