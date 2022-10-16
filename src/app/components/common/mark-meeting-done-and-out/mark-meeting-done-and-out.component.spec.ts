import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkMeetingDoneAndOutComponent } from './mark-meeting-done-and-out.component';

describe('MarkMeetingDoneAndOutComponent', () => {
  let component: MarkMeetingDoneAndOutComponent;
  let fixture: ComponentFixture<MarkMeetingDoneAndOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkMeetingDoneAndOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkMeetingDoneAndOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
