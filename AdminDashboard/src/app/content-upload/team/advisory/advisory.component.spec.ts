import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryComponent } from './advisory.component';

describe('AdvisoryComponent', () => {
  let component: AdvisoryComponent;
  let fixture: ComponentFixture<AdvisoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvisoryComponent]
    });
    fixture = TestBed.createComponent(AdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
