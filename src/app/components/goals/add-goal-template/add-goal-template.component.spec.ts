import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalTemplateComponent } from './add-goal-template.component';

describe('AddGoalTemplateComponent', () => {
  let component: AddGoalTemplateComponent;
  let fixture: ComponentFixture<AddGoalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
