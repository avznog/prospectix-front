import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachGoalDashboardComponent } from './each-goal-dashboard.component';

describe('EachGoalComponent', () => {
  let component: EachGoalDashboardComponent;
  let fixture: ComponentFixture<EachGoalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachGoalDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachGoalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
