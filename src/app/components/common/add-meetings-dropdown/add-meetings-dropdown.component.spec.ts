import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingsDropdownComponent } from './add-meetings-dropdown.component';

describe('AddMeetingsDropdownComponent', () => {
  let component: AddMeetingsDropdownComponent;
  let fixture: ComponentFixture<AddMeetingsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingsDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
