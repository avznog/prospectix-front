import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchtowerComponent } from './watchtower.component';

describe('WatchtowerComponent', () => {
  let component: WatchtowerComponent;
  let fixture: ComponentFixture<WatchtowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchtowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchtowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
