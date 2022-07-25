import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsResearchBlocComponent } from './meetings-research-bloc.component';

describe('MeetingsResearchBlocComponent', () => {
  let component: MeetingsResearchBlocComponent;
  let fixture: ComponentFixture<MeetingsResearchBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsResearchBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsResearchBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
