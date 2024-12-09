import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditOfferingComponent } from './add-or-edit-offering.component';

describe('AddOrEditOfferingComponent', () => {
  let component: AddOrEditOfferingComponent;
  let fixture: ComponentFixture<AddOrEditOfferingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditOfferingComponent]
    });
    fixture = TestBed.createComponent(AddOrEditOfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
