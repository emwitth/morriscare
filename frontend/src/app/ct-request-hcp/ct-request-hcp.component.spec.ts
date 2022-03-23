import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtRequestHcpComponent } from './ct-request-hcp.component';

describe('CtRequestHcpComponent', () => {
  let component: CtRequestHcpComponent;
  let fixture: ComponentFixture<CtRequestHcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtRequestHcpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtRequestHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
