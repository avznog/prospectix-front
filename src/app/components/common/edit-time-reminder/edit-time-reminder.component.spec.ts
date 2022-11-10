import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeReminderComponent } from './edit-time-reminder.component';

describe('EditTimeReminderComponent', () => {
  let component: EditTimeReminderComponent;
  let fixture: ComponentFixture<EditTimeReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTimeReminderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTimeReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
