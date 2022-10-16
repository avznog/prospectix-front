import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectEditComponent } from './prospect-edit.component';

describe('ProspectEditComponent', () => {
  let component: ProspectEditComponent;
  let fixture: ComponentFixture<ProspectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
