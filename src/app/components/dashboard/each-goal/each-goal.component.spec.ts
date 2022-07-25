import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachGoalComponent } from './each-goal.component';

describe('EachGoalComponent', () => {
  let component: EachGoalComponent;
  let fixture: ComponentFixture<EachGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
