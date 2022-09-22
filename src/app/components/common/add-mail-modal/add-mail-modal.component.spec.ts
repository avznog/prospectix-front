import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMailModalComponent } from './add-mail-modal.component';

describe('AddMailModalComponent', () => {
  let component: AddMailModalComponent;
  let fixture: ComponentFixture<AddMailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
