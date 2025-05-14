import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-new-class-form',
  templateUrl: './new-class-form.component.html',
  styleUrls: ['./new-class-form.component.scss']
})
export class NewClassFormComponent {
  classForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      subject: ['', Validators.required],
      dateTime: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['']
    });
  }

  // This method handles form submission
  onSubmit() {
    if (this.classForm.valid) {
      const newClass = this.classForm.value;
  
      // Get the current user UID
      this.afAuth.currentUser.then(user => {
        const uid = user?.uid;  // Get the current user's UID
  
        // Include the owner's UID in the class data
        const classData = {
          ...newClass,
          id: this.db.createPushId(),
          ownerId: uid  // Add the ownerId field
        };
  
        const classesRef = this.db.list('classes');
  
        // Push the class data with the generated ID
        classesRef.update(classData.id, classData)
          .then(() => {
            console.log('Class saved:', classData);
            // Once class is saved, call to add schedule
            this.addScheduleToFirebase(classData);
          })
          .catch(err => console.error('Error saving class:', err));
      }).catch(err => console.error('Error fetching user:', err)); // <-- This was missing
    } else {
      console.error('Form is invalid:', this.classForm.errors);
    }
  }
  

  // This method handles adding the schedule to Firebase
  addScheduleToFirebase(classData: any) {
    // Generate unique ID for the new schedule
    const scheduleId = this.db.createPushId();
    const scheduleData = {
      id: scheduleId,
      className: classData.className,
      subject: classData.subject || 'No subject',
      date: new Date(classData.dateTime).toLocaleDateString(), // Format date
      time: new Date(classData.dateTime).toLocaleTimeString(), // Format time
      duration: classData.duration || 'Not specified',
      description: classData.description || 'No description provided'
    };

    // Push the schedule data
    const schedulesRef = this.db.list('schedules');
    schedulesRef.update(scheduleData.id, scheduleData)
      .then(() => {
        console.log('Schedule saved:', scheduleData);
        // Navigate back to the dashboard
        this.router.navigate(['/tutor-dashboard']);
      })
      .catch(err => console.error('Error saving schedule:', err));
  }
}
