import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachReminderComponent } from './each-reminder.component';

describe('EachReminderComponent', () => {
  let component: EachReminderComponent;
  let fixture: ComponentFixture<EachReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
