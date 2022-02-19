import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-sm-dialog',
  templateUrl: './add-sm-dialog.component.html',
  styleUrls: ['./add-sm-dialog.component.css']
})
export class AddSmDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')]]
    }, {});
   }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  addStaffMember() { 
    console.log(this.form.get('firstName')?.value);
    console.log(this.form.get('lastName')?.value);
    console.log(this.form.get('email')?.value);
    console.log(this.form.get('address')?.value);
    console.log(this.form.get('phone')?.value);
    this.dialogRef.close({ event: 'close', data: this.fromDialog }); 
  }
}
