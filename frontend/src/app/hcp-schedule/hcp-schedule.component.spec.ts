import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpScheduleComponent } from './hcp-schedule.component';

describe('HcpScheduleComponent', () => {
  let component: HcpScheduleComponent;
  let fixture: ComponentFixture<HcpScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcpScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
