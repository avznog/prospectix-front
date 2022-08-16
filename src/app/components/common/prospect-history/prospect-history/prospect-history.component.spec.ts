import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectHistoryComponent } from './prospect-history.component';

describe('ProspectHistoryComponent', () => {
  let component: ProspectHistoryComponent;
  let fixture: ComponentFixture<ProspectHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
