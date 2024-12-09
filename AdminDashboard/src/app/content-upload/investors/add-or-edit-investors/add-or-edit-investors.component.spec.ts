import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditInvestorsComponent } from './add-or-edit-investors.component';

describe('AddOrEditInvestorsComponent', () => {
  let component: AddOrEditInvestorsComponent;
  let fixture: ComponentFixture<AddOrEditInvestorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditInvestorsComponent]
    });
    fixture = TestBed.createComponent(AddOrEditInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
