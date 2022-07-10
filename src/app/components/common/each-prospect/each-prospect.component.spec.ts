import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachProspectComponent } from './each-prospect.component';

describe('EachProspectComponent', () => {
  let component: EachProspectComponent;
  let fixture: ComponentFixture<EachProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
