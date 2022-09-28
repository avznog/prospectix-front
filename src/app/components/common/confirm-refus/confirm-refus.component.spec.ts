import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRefusComponent } from './confirm-refus.component';

describe('ConfirmRefusComponent', () => {
  let component: ConfirmRefusComponent;
  let fixture: ComponentFixture<ConfirmRefusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRefusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRefusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
