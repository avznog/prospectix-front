import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectixLogoComponent } from './prospectix-logo.component';

describe('ProspectixLogoComponent', () => {
  let component: ProspectixLogoComponent;
  let fixture: ComponentFixture<ProspectixLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectixLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectixLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
