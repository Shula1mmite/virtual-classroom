import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { CloudinaryService } from '../services/cloudinary.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss']
})
export class TutorDashboardComponent implements OnInit {
  classes: any[] = [];
  schedules: any[] = [];
  fileToUpload: File | null = null;
  allowedCourses = ['Science', 'Programming', 'Maths'];
  selectedCourse: string = '';

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private cloudinaryService: CloudinaryService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.fetchClasses();
    this.fetchSchedules();
  }

  fetchClasses() {
    this.db.list('classes').snapshotChanges().subscribe(actions => {
      this.classes = actions.map(action => ({
        id: action.key,
        ...(action.payload.val() as any),
      }));
    });
  }

  fetchSchedules() {
    this.db.list('schedules').snapshotChanges().subscribe({
      next: (snapshot) => {
        this.schedules = snapshot.map(snap => ({
          id: snap.key,
          ...snap.payload.val() as any,
        }));
        console.log('Schedules fetched:', this.schedules);
      },
      error: (err) => {
        console.error('Error fetching schedules:', err);
      }
    });
  }

  addClassToSchedules(newClass: any) {
    const scheduleId = this.db.createPushId();
    const scheduleData = {
      id: scheduleId,
      className: newClass.className,
      subject: newClass.subject || 'No subject',
      date: newClass.dateTime.split('T')[0],
      time: newClass.dateTime.split('T')[1],
      duration: newClass.duration || 'Not specified',
      description: newClass.description || 'No description provided',
    };

    console.log('Schedule Data Before Save:', scheduleData);

    this.db.list('schedules').set(scheduleId, scheduleData).then(() => {
      console.log('Schedule added:', scheduleData);
      this.schedules.push(scheduleData);
    });
  }

  navigateToNewClassForm() {
    this.router.navigate(['/new-class']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'File uploaded successfully! View in Resources tab.',
      duration: 3000, // Show for 3 seconds
      position: 'top',
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.router.navigate(['/resources']); // ✅ Navigate to Resources
          }
        }
      ]
    });
    toast.present();
  }
  

  // Handle file selection
  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  // Upload file to Cloudinary and save metadata to Firebase
  uploadFile() {
    if (!this.fileToUpload) {
      console.error('No file selected.');
      return;
    }
  
    if (!this.selectedCourse) {
      console.error('Please select a course.');
      return;
    }
  
    this.cloudinaryService.uploadFile(this.fileToUpload, this.selectedCourse).subscribe(
      (response) => {
        console.log('Cloudinary Response:', response);
  
        const downloadURL = response?.secure_url;
        if (!downloadURL) {
          console.error('No secure_url returned from Cloudinary');
          return;
        }
  
        const newResource = {
          course: this.selectedCourse,
          fileName: this.fileToUpload?.name || 'Unknown File', // ✅ Ensure 'name' is accessed safely
          fileUrl: downloadURL
        };
  
        // Save resource data to Firebase
        this.db.list('resources').push(newResource).then(() => {
          console.log('Resource uploaded successfully!', newResource);
          this.presentToast(); 
        }).catch((error) => console.error('Error saving resource:', error));
      },
      (error) => {
        console.error('Error uploading file to Cloudinary:', error);
      }
    );
  }
  
}  