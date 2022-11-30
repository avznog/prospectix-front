import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGoalTemplateComponent } from './delete-goal-template.component';

describe('DeleteGoalTemplateComponent', () => {
  let component: DeleteGoalTemplateComponent;
  let fixture: ComponentFixture<DeleteGoalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGoalTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGoalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
