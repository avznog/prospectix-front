import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchProspectsComponent } from './research-prospects.component';

describe('ResearchProspectsComponent', () => {
  let component: ResearchProspectsComponent;
  let fixture: ComponentFixture<ResearchProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchProspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
