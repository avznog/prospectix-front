import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingsModalComponent } from './add-meetings-modal.component';

describe('AddMeetingsModalComponent', () => {
  let component: AddMeetingsModalComponent;
  let fixture: ComponentFixture<AddMeetingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetingsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
