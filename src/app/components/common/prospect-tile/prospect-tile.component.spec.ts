import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectTileComponent } from './prospect-tile.component';

describe('ProspectTileComponent', () => {
  let component: ProspectTileComponent;
  let fixture: ComponentFixture<ProspectTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
