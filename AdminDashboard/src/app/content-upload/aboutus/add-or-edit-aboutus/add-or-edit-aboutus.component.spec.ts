import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditAboutusComponent } from './add-or-edit-aboutus.component';

describe('AddOrEditAboutusComponent', () => {
  let component: AddOrEditAboutusComponent;
  let fixture: ComponentFixture<AddOrEditAboutusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditAboutusComponent]
    });
    fixture = TestBed.createComponent(AddOrEditAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
