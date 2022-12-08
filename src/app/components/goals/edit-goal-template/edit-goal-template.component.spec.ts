import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoalTemplateComponent } from './edit-goal-template.component';

describe('EditGoalTemplateComponent', () => {
  let component: EditGoalTemplateComponent;
  let fixture: ComponentFixture<EditGoalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGoalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGoalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
