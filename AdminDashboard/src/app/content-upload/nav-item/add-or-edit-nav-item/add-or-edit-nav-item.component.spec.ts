import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditNavItemComponent } from './add-or-edit-nav-item.component';

describe('AddOrEditNavItemComponent', () => {
  let component: AddOrEditNavItemComponent;
  let fixture: ComponentFixture<AddOrEditNavItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditNavItemComponent]
    });
    fixture = TestBed.createComponent(AddOrEditNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
