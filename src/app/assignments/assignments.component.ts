import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent {

  constructor(private router: Router) {}

  selectRole(role: string) {
    if (role === 'tutor') {
      this.router.navigate(['/assignments/tutor']);
    } else if (role === 'student') {
      this.router.navigate(['/assignments/student']);
    }
  }
}
