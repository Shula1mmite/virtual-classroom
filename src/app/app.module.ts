import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageModule } from './home/home.module';
import { CoursesComponent } from './courses/courses.component';
import { CommunityComponent } from './community/community.component'; 
import { LiveClassesComponent } from './live-classes/live-classes.component';
import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component'; // Import your component
import { NewClassFormComponent } from './tutor-dashboard/new-class-form/new-class-form.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component'; // Add your component
import { ResourcesComponent } from './resources/resources.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { TutorAssignmentsComponent } from './tutor-assignments/tutor-assignments.component';
import { StudentAssignmentsComponent } from './student-assignments/student-assignments.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';

import { AngularFireModule } from '@angular/fire/compat';  // Corrected import
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Corrected import
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouteReuseStrategy } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';







@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    CoursesComponent,
    CommunityComponent,
    LiveClassesComponent,
    TutorDashboardComponent,
    NewClassFormComponent,
    StudentDashboardComponent,  // Declare the component here
    ResourcesComponent,
    AssignmentsComponent,
    TutorAssignmentsComponent,
    StudentAssignmentsComponent,
    DashboardComponent,
    DashboardStatsComponent,
    DashboardHeaderComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),  // Firebase initialization
    AngularFireAuthModule,  // Firebase Auth module
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    HomePageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
