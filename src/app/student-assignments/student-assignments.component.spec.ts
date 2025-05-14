import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentAssignmentsComponent } from './student-assignments.component';

describe('StudentAssignmentsComponent', () => {
  let component: StudentAssignmentsComponent;
  let fixture: ComponentFixture<StudentAssignmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
