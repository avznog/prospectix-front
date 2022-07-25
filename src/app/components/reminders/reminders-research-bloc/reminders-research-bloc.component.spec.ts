import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersResearchBlocComponent } from './reminders-research-bloc.component';

describe('RemindersResearchBlocComponent', () => {
  let component: RemindersResearchBlocComponent;
  let fixture: ComponentFixture<RemindersResearchBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindersResearchBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersResearchBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
