import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAccountSmViewComponent } from './billing-account-sm-view.component';

describe('BillingAccountSmViewComponent', () => {
  let component: BillingAccountSmViewComponent;
  let fixture: ComponentFixture<BillingAccountSmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingAccountSmViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAccountSmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
