import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeComponent } from './coupon-code.component';

describe('CouponCodeComponent', () => {
  let component: CouponCodeComponent;
  let fixture: ComponentFixture<CouponCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
