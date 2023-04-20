import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeSearchComponent } from './backoffice-search.component';

describe('BackofficeSearchComponent', () => {
  let component: BackofficeSearchComponent;
  let fixture: ComponentFixture<BackofficeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackofficeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackofficeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
