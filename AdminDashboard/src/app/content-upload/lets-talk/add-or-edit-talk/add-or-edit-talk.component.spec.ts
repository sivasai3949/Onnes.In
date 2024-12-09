import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTalkComponent } from './add-or-edit-talk.component';

describe('AddOrEditTalkComponent', () => {
  let component: AddOrEditTalkComponent;
  let fixture: ComponentFixture<AddOrEditTalkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditTalkComponent]
    });
    fixture = TestBed.createComponent(AddOrEditTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
