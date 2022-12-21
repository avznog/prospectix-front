import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteMailTemplateComponent } from './confirm-delete-mail-template.component';

describe('ConfirmDeleteMailTemplateComponent', () => {
  let component: ConfirmDeleteMailTemplateComponent;
  let fixture: ComponentFixture<ConfirmDeleteMailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteMailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
