import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfrpVesselsComponent } from './cfrp-vessels.component';

describe('CfrpVesselsComponent', () => {
  let component: CfrpVesselsComponent;
  let fixture: ComponentFixture<CfrpVesselsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CfrpVesselsComponent]
    });
    fixture = TestBed.createComponent(CfrpVesselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
