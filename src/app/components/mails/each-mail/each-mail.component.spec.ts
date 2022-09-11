import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachMailComponent } from './each-mail.component';

describe('EachMailComponent', () => {
  let component: EachMailComponent;
  let fixture: ComponentFixture<EachMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
