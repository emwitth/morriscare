import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtRequestDetailsComponent } from './ct-request-details.component';

describe('CtRequestDetailsComponent', () => {
  let component: CtRequestDetailsComponent;
  let fixture: ComponentFixture<CtRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
