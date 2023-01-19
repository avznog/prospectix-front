import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2callbackComponent } from './oauth2callback.component';

describe('Oauth2callbackComponent', () => {
  let component: Oauth2callbackComponent;
  let fixture: ComponentFixture<Oauth2callbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oauth2callbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oauth2callbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
