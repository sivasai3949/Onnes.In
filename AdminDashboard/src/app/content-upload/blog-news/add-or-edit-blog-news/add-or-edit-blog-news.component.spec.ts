import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditBlogNewsComponent } from './add-or-edit-blog-news.component';

describe('AddOrEditBlogNewsComponent', () => {
  let component: AddOrEditBlogNewsComponent;
  let fixture: ComponentFixture<AddOrEditBlogNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditBlogNewsComponent]
    });
    fixture = TestBed.createComponent(AddOrEditBlogNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
