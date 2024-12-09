import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditAdvisoryComponent } from './add-or-edit-advisory.component';

describe('AddOrEditAdvisoryComponent', () => {
  let component: AddOrEditAdvisoryComponent;
  let fixture: ComponentFixture<AddOrEditAdvisoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditAdvisoryComponent]
    });
    fixture = TestBed.createComponent(AddOrEditAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
