import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-posting-dialog',
  templateUrl: './add-posting-dialog.component.html',
  styleUrls: ['./add-posting-dialog.component.css']
})
export class AddPostingDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  form: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient,
    public dialogRef: MatDialogRef<AddPostingDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) {
      this.form = this.fb.group({
        Type: ['', Validators.required],
        Qualifications: ['', [Validators.required, Validators.pattern("[A-Za-x0-9 ]*")]],
        Education: ['', [Validators.required, Validators.pattern("[A-Za-x0-9 ]*")]]
      }, {});
    }

  create(){}

  // close dialogue with false state
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  ngOnInit(): void {
  }

}
