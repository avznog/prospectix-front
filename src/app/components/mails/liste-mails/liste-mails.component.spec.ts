import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMailsComponent } from './liste-mails.component';

describe('ListeMailsComponent', () => {
  let component: ListeMailsComponent;
  let fixture: ComponentFixture<ListeMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
