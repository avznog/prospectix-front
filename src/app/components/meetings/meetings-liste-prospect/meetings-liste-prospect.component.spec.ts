import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsListeProspectComponent } from './meetings-liste-prospect.component';

describe('MeetingsListeProspectComponent', () => {
  let component: MeetingsListeProspectComponent;
  let fixture: ComponentFixture<MeetingsListeProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsListeProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsListeProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
