import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsListeComponent } from './meetings-liste.component';

describe('MeetingsListeProspectComponent', () => {
  let component: MeetingsListeComponent;
  let fixture: ComponentFixture<MeetingsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
