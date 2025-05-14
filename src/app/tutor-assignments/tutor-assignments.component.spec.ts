import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorAssignmentsComponent } from './tutor-assignments.component';

describe('TutorAssignmentsComponent', () => {
  let component: TutorAssignmentsComponent;
  let fixture: ComponentFixture<TutorAssignmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorAssignmentsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
