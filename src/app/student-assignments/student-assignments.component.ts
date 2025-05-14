import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.scss']
})
export class StudentAssignmentsComponent {
  selectedCourse: string = '';
  assignments: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  // Load assignments for selected class/course
  loadAssignments(course: string) {
    this.selectedCourse = course;
    this.db.list(`assignments/${course}`).valueChanges().subscribe(data => {
      this.assignments = data;
    });
  }
}
