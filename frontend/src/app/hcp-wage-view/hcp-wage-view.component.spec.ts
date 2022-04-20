import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpWageViewComponent } from './hcp-wage-view.component';

describe('HcpWageViewComponent', () => {
  let component: HcpWageViewComponent;
  let fixture: ComponentFixture<HcpWageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcpWageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpWageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
