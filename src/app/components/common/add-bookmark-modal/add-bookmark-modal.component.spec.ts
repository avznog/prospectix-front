import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookmarkModalComponent } from './add-bookmark-modal.component';

describe('AddBookmarkModalComponent', () => {
  let component: AddBookmarkModalComponent;
  let fixture: ComponentFixture<AddBookmarkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookmarkModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookmarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
