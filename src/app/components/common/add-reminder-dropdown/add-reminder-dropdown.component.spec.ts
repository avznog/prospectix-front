import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReminderDropdownComponent } from './add-reminder-dropdown.component';

describe('AddReminderDropdownComponent', () => {
  let component: AddReminderDropdownComponent;
  let fixture: ComponentFixture<AddReminderDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReminderDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReminderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
