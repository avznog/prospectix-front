import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachProspectChangeParameterComponent } from './each-prospect-change-parameter.component';

describe('EachProspectChangeParameterComponent', () => {
  let component: EachProspectChangeParameterComponent;
  let fixture: ComponentFixture<EachProspectChangeParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachProspectChangeParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachProspectChangeParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
