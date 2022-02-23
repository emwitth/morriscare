import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtManageComponent } from './ct-manage.component';

describe('CtManageComponent', () => {
  let component: CtManageComponent;
  let fixture: ComponentFixture<CtManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
