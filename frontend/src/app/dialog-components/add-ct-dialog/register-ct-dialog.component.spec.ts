import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCtDialogComponent } from './register-ct-dialog.component';

describe('AddCtDialogComponent', () => {
  let component: RegisterCtDialogComponent;
  let fixture: ComponentFixture<RegisterCtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCtDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
