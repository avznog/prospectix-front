import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksResearchBlocComponent } from './bookmarks-research-bloc.component';

describe('BookmarksResearchBlocComponent', () => {
  let component: BookmarksResearchBlocComponent;
  let fixture: ComponentFixture<BookmarksResearchBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksResearchBlocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksResearchBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
