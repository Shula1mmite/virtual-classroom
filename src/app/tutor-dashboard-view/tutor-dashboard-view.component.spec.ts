import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorDashboardViewComponent } from './tutor-dashboard-view.component';

describe('TutorDashboardViewComponent', () => {
  let component: TutorDashboardViewComponent;
  let fixture: ComponentFixture<TutorDashboardViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorDashboardViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
