import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  authState: any; // Holds the authentication state

  constructor(private afAuth: AngularFireAuth) {
    // Subscribe to the authentication state
    this.afAuth.authState.subscribe((state) => {
      this.authState = state;
    });
  }
}
