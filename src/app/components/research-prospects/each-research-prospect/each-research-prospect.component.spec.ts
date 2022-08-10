import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachResearchProspectComponent } from './each-research-prospect.component';

describe('EachProspectComponent', () => {
  let component: EachResearchProspectComponent;
  let fixture: ComponentFixture<EachResearchProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachResearchProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachResearchProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
