import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListeGoalsComponent } from './dashboard-liste-goals.component';

describe('DashboardListeGoalsComponent', () => {
  let component: DashboardListeGoalsComponent;
  let fixture: ComponentFixture<DashboardListeGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardListeGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardListeGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
