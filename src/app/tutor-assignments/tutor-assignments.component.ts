import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tutor-assignments',
  templateUrl: './tutor-assignments.component.html',
  styleUrls: ['./tutor-assignments.component.scss']
})
export class TutorAssignmentsComponent implements OnInit {
  assignmentForm: FormGroup;
  selectedCourse: string = '';
  allAssignments: { course: string, data: any }[] = [];
  filteredAssignments: any[] = [];

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) {
    this.assignmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchAllAssignments();
  }

  // ✅ Fetch all assignments across courses
  fetchAllAssignments() {
    this.db.object('assignments').valueChanges().subscribe((data: any) => {
      this.allAssignments = [];

      if (data) {
        Object.keys(data).forEach(course => {
          const courseAssignments = data[course];
          Object.keys(courseAssignments).forEach(id => {
            this.allAssignments.push({
              course,
              data: courseAssignments[id]
            });
          });
        });
      }

      this.filterAssignments(); // Apply filter if course is already selected
    });
  }

  // ✅ Course selection changed
  onCourseChange(course: string) {
    this.selectedCourse = course;
    this.filterAssignments();
  }

  // ✅ Filter based on selected course
  filterAssignments() {
    if (this.selectedCourse) {
      this.filteredAssignments = this.allAssignments
        .filter(a => a.course === this.selectedCourse)
        .map(a => a.data);
    } else {
      this.filteredAssignments = [];
    }
  }

  // ✅ Submit new assignment
  submitAssignment() {
    if (this.assignmentForm.valid && this.selectedCourse) {
      const assignment = {
        id: this.db.createPushId(),
        ...this.assignmentForm.value
      };

      this.db.list(`assignments/${this.selectedCourse}`).set(assignment.id, assignment).then(() => {
        this.assignmentForm.reset();
      });
    }
  }
}
