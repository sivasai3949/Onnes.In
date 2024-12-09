import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditJoinUsComponent } from './add-or-edit-join-us.component';

describe('AddOrEditJoinUsComponent', () => {
  let component: AddOrEditJoinUsComponent;
  let fixture: ComponentFixture<AddOrEditJoinUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditJoinUsComponent]
    });
    fixture = TestBed.createComponent(AddOrEditJoinUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
