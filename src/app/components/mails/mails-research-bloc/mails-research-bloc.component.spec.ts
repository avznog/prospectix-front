import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsResearchBlocComponent } from './mails-research-bloc.component';

describe('MailsResearchBlocComponent', () => {
  let component: MailsResearchBlocComponent;
  let fixture: ComponentFixture<MailsResearchBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailsResearchBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailsResearchBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
