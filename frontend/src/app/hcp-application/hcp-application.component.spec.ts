import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpApplicationComponent } from './hcp-application.component';

describe('HcpApplicationComponent', () => {
  let component: HcpApplicationComponent;
  let fixture: ComponentFixture<HcpApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcpApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
