import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtRequestManageComponent } from './ct-request-manage.component';

describe('CtRequestManageComponent', () => {
  let component: CtRequestManageComponent;
  let fixture: ComponentFixture<CtRequestManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtRequestManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtRequestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
