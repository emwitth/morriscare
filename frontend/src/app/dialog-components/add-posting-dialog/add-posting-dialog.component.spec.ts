import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostingDialogComponent } from './add-posting-dialog.component';

describe('AddPostingDialogComponent', () => {
  let component: AddPostingDialogComponent;
  let fixture: ComponentFixture<AddPostingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
