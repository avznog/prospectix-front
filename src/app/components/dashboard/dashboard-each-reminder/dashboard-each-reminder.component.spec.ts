import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEachReminderComponent } from './dashboard-each-reminder.component';

describe('DashboardEachReminderComponent', () => {
  let component: DashboardEachReminderComponent;
  let fixture: ComponentFixture<DashboardEachReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEachReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEachReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
