import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMailTemplateComponent } from './display-mail-template.component';

describe('DisplayMailTemplateComponent', () => {
  let component: DisplayMailTemplateComponent;
  let fixture: ComponentFixture<DisplayMailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
