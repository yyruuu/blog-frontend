import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionComponent } from './admin-permission.component';

describe('AdminPermissionComponent', () => {
  let component: AdminPermissionComponent;
  let fixture: ComponentFixture<AdminPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
