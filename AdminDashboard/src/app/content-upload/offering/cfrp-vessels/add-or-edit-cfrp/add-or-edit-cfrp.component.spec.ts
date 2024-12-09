import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCfrpComponent } from './add-or-edit-cfrp.component';

describe('AddOrEditCfrpComponent', () => {
  let component: AddOrEditCfrpComponent;
  let fixture: ComponentFixture<AddOrEditCfrpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditCfrpComponent]
    });
    fixture = TestBed.createComponent(AddOrEditCfrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
