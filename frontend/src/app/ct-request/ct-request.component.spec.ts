import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtRequestComponent } from './ct-request.component';

describe('CtRequestComponent', () => {
  let component: CtRequestComponent;
  let fixture: ComponentFixture<CtRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
