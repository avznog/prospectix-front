import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGoalsComponent } from './liste-goals.component';

describe('ListeGoalsComponent', () => {
  let component: ListeGoalsComponent;
  let fixture: ComponentFixture<ListeGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
