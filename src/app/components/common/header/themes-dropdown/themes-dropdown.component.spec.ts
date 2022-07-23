import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesDropdownComponent } from './themes-dropdown.component';

describe('ThemesDropdownComponent', () => {
  let component: ThemesDropdownComponent;
  let fixture: ComponentFixture<ThemesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
