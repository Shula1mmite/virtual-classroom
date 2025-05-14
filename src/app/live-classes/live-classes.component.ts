import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the router to navigate

@Component({
  selector: 'app-live-classes',
  templateUrl: './live-classes.component.html',
  styleUrls: ['./live-classes.component.scss'],
})
export class LiveClassesComponent {

  constructor(private router: Router) {}

  // Navigate to the appropriate dashboard
  navigateToDashboard(role: string) {
    if (role === 'tutor') {
      this.router.navigate(['/tutor-dashboard']);
    } else if (role === 'student') {
      this.router.navigate(['/student-dashboard']);
    }
  }
}
