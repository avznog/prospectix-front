import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProComponent } from './confirm-pro.component';

describe('ConfirmProComponent', () => {
  let component: ConfirmProComponent;
  let fixture: ComponentFixture<ConfirmProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
