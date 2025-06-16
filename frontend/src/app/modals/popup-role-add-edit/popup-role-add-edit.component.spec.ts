import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRoleAddEditComponent } from './popup-role-add-edit.component';

describe('PopupRoleAddEditComponent', () => {
  let component: PopupRoleAddEditComponent;
  let fixture: ComponentFixture<PopupRoleAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRoleAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRoleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
