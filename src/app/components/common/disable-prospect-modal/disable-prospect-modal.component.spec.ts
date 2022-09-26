import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableProspectModalComponent } from './disable-prospect-modal.component';

describe('DisableProspectModalComponent', () => {
  let component: DisableProspectModalComponent;
  let fixture: ComponentFixture<DisableProspectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableProspectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableProspectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
