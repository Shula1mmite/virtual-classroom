import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  availableClasses: any[] = [];  // All available classes
  filteredClasses: any[] = [];   // Filtered classes based on selected course
  predefinedCourses: string[] = ['Science', 'Programming', 'Math'];  // Define predefined courses
  selectedCourse: string = '';   // The course selected by the student

  constructor(private db: AngularFireDatabase, private router: Router) {}  // Inject Router

  ngOnInit(): void {
    this.db
      .list('schedules')
      .valueChanges()
      .subscribe((schedules: any[]) => {
        this.availableClasses = schedules;
        this.filteredClasses = schedules;  // Initially show all available classes
      });
  }

  // Handle course selection
  onCourseSelect(event: any) {
    this.selectedCourse = event.target.value;
  
    if (this.selectedCourse) {
      this.filteredClasses = this.availableClasses.filter(
        (classData) => classData.className.toLowerCase() === this.selectedCourse.toLowerCase()
      );
    } else {
      this.filteredClasses = this.availableClasses;
    }
  }
  

  // Navigate to Resources tab to view materials for the selected course
  viewCourseMaterials(courseName: string) {
    console.log(`View materials for ${courseName}`);
    this.router.navigate(['/resources'], { queryParams: { course: courseName } });  // Navigate with course info
  }
}
