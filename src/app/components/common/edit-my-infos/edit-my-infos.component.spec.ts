import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyInfosComponent } from './edit-my-infos.component';

describe('EditMyInfosComponent', () => {
  let component: EditMyInfosComponent;
  let fixture: ComponentFixture<EditMyInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
