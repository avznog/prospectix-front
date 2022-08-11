import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBookmarksComponent } from './liste-bookmarks.component';

describe('ListeBookmarksComponent', () => {
  let component: ListeBookmarksComponent;
  let fixture: ComponentFixture<ListeBookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBookmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
