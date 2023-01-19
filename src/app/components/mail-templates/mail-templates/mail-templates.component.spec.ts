import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTemplatesComponent } from './mail-templates.component';

describe('MailTemplatesComponent', () => {
  let component: MailTemplatesComponent;
  let fixture: ComponentFixture<MailTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
