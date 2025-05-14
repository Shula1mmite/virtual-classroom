import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePage } from './home/home.page';
import { CoursesComponent } from './courses/courses.component';
import { CommunityComponent } from './community/community.component';
import { LiveClassesComponent } from './live-classes/live-classes.component';
import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NewClassFormComponent } from './tutor-dashboard/new-class-form/new-class-form.component';
import { ResourcesComponent } from './resources/resources.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { TutorAssignmentsComponent } from './tutor-assignments/tutor-assignments.component';
import { StudentAssignmentsComponent } from './student-assignments/student-assignments.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'home', component: HomePage},
  { path: 'courses', component: CoursesComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'resources', component: ResourcesComponent }, 
  { path: 'live-classes', component: LiveClassesComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'assignments/tutor', component: TutorAssignmentsComponent },
  { path: 'assignments/student', component: StudentAssignmentsComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: '',
    redirectTo: '/live-classes',
    pathMatch: 'full'
  },
  {
    path: 'tutor-dashboard',
    component: TutorDashboardComponent
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent
  },
  { 
    path: 'new-class', 
    component: NewClassFormComponent
   },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
