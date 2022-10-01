import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSmallCardComponent } from './stats-small-card.component';

describe('StatsSmallCardComponent', () => {
  let component: StatsSmallCardComponent;
  let fixture: ComponentFixture<StatsSmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsSmallCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
