import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmDialogComponent } from './add-sm-dialog.component';

describe('AddSmDialogComponent', () => {
  let component: AddSmDialogComponent;
  let fixture: ComponentFixture<AddSmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
