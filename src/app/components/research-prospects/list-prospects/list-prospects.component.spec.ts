import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProspectsComponent } from './list-prospects.component';

describe('ListProspectsComponent', () => {
  let component: ListProspectsComponent;
  let fixture: ComponentFixture<ListProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
