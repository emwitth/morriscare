import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormattingModule } from 'src/app/modules/formatting/formatting.module';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private http: HttpClient,
    public dialogRef: MatDialogRef<RegisterCtDialogComponent>,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    }, {});
   }

  ngOnInit(): void {
  }

  /**
   * Returns false indicating the request has been canceled
   */
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  /**
   * Returns true from the dialogue if the care taker 
   * account request goes through.
   */
  register() { 
    console.log(this.form.get('firstName')?.value);
    console.log(this.form.get('lastName')?.value);
    console.log(this.form.get('email')?.value);
    console.log(this.form.get('address')?.value);
    console.log(this.form.get('phone')?.value);
    console.log(this.format.formatPhone(this.form.get('phone')?.value));
     
    var body = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      postalAddress: this.form.get('address')?.value,
      phoneNumber: this.form.get('phone')?.value,
      role: "staff"
    }

    // console.log(body);
    this.http.post<any>("api/caretakers/", body, { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        this.openSnackBar("An Error Occured, please try again", "Okay");
        // this.isIncorrectLogin = true;
      } else if(result.status == 200) {
        // console.log(result.body);
        this.openSnackBar("Account Request Successfully Submitted", "Okay");
        this.dialogRef.close({ event: 'close', data: true }); 
      }
    }, err => {
      // this.isIncorrectLogin = true;
      this.openSnackBar("An Error Occured, please try again", "Okay");
    });

    // this.dialogRef.close({ event: 'close', data: true }); 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: 'mat-snackbar-colors'
    });
  }

}
