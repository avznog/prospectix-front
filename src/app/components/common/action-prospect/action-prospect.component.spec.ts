import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProspectComponent } from './action-prospect.component';

describe('ActionProspectComponent', () => {
  let component: ActionProspectComponent;
  let fixture: ComponentFixture<ActionProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionProspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
