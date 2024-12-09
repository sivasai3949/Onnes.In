import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditHomeImageComponent } from './add-or-edit-home-image.component';

describe('AddOrEditHomeImageComponent', () => {
  let component: AddOrEditHomeImageComponent;
  let fixture: ComponentFixture<AddOrEditHomeImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditHomeImageComponent]
    });
    fixture = TestBed.createComponent(AddOrEditHomeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
