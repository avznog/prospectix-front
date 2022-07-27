import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEachGoalComponent } from './dashboard-each-goal.component';

describe('DashboardEachGoalComponent', () => {
  let component: DashboardEachGoalComponent;
  let fixture: ComponentFixture<DashboardEachGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEachGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEachGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
