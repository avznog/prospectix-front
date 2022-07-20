import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersListeProspectComponent } from './reminders-liste-prospect.component';

describe('RemindersListeProspectComponent', () => {
  let component: RemindersListeProspectComponent;
  let fixture: ComponentFixture<RemindersListeProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindersListeProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersListeProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
