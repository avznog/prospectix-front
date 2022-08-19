import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalResearchBlocComponent } from './goal-research-bloc.component';

describe('GoalResearchBlocComponent', () => {
  let component: GoalResearchBlocComponent;
  let fixture: ComponentFixture<GoalResearchBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalResearchBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalResearchBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
