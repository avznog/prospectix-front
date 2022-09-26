import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchBlocComponent } from './research-bloc.component';

describe('ResearchBlocComponent', () => {
  let component: ResearchBlocComponent;
  let fixture: ComponentFixture<ResearchBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
