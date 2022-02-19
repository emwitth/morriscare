import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormattingModule } from 'src/app/modules/formatting/formatting.module';

@Component({
  selector: 'app-register-ct-dialog',
  templateUrl: './register-ct-dialog.component.html',
  styleUrls: ['./register-ct-dialog.component.css']
})
export class RegisterCtDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private format: FormattingModule,
    public dialogRef: MatDialogRef<RegisterCtDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    }, {});
   }

  ngOnInit(): void {
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  register() { 
    console.log(this.form.get('firstName')?.value);
    console.log(this.form.get('lastName')?.value);
    console.log(this.form.get('email')?.value);
    console.log(this.form.get('address')?.value);
    console.log(this.form.get('phone')?.value);
    console.log(this.format.formatPhone(this.form.get('phone')?.value));
    this.dialogRef.close({ event: 'close', data: true }); 
  }
}
