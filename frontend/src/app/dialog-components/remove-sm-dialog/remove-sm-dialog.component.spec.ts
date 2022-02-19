import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSmDialogComponent } from './remove-sm-dialog.component';

describe('RemoveSmDialogComponent', () => {
  let component: RemoveSmDialogComponent;
  let fixture: ComponentFixture<RemoveSmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveSmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
