import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachMeetingComponent } from './each-meeting.component';

describe('EachMeetingComponent', () => {
  let component: EachMeetingComponent;
  let fixture: ComponentFixture<EachMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
