import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtRequestCtViewComponent } from './ct-request-ct-view.component';

describe('CtRequestCtViewComponent', () => {
  let component: CtRequestCtViewComponent;
  let fixture: ComponentFixture<CtRequestCtViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtRequestCtViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtRequestCtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
