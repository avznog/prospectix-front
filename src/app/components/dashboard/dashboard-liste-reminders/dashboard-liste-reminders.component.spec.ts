import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListeRemindersComponent } from './dashboard-liste-reminders.component';

describe('DashboardListeRemindersComponent', () => {
  let component: DashboardListeRemindersComponent;
  let fixture: ComponentFixture<DashboardListeRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardListeRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardListeRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
