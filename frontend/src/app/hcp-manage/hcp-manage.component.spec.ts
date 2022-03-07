import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpManageComponent } from './hcp-manage.component';

describe('HcpManageComponent', () => {
  let component: HcpManageComponent;
  let fixture: ComponentFixture<HcpManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcpManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
