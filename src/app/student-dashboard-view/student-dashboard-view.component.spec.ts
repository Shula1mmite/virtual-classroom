import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentDashboardViewComponent } from './student-dashboard-view.component';

describe('StudentDashboardViewComponent', () => {
  let component: StudentDashboardViewComponent;
  let fixture: ComponentFixture<StudentDashboardViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDashboardViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
