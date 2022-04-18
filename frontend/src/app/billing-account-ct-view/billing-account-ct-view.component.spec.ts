import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAccountCtViewComponent } from './billing-account-ct-view.component';

describe('BillingAccountCtViewComponent', () => {
  let component: BillingAccountCtViewComponent;
  let fixture: ComponentFixture<BillingAccountCtViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingAccountCtViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAccountCtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
