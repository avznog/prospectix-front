import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachBookmarkComponent } from './each-bookmark.component';

describe('EachBookmarkComponent', () => {
  let component: EachBookmarkComponent;
  let fixture: ComponentFixture<EachBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
