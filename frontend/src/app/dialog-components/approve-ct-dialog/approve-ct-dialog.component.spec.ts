import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCtDialogComponent } from './approve-ct-dialog.component';

describe('ApproveCtDialogComponent', () => {
  let component: ApproveCtDialogComponent;
  let fixture: ComponentFixture<ApproveCtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCtDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
