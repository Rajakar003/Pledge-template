import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturePopComponent } from './capture-pop.component';

describe('CapturePopComponent', () => {
  let component: CapturePopComponent;
  let fixture: ComponentFixture<CapturePopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturePopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
