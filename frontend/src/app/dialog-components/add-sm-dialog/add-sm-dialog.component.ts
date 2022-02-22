import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormattingModule } from 'src/app/modules/formatting/formatting.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-sm-dialog',
  templateUrl: './add-sm-dialog.component.html',
  styleUrls: ['./add-sm-dialog.component.css']
})
export class AddSmDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  form: FormGroup;

  // items to display if post goes through
  isAdded: boolean = false;
  username: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";

  constructor(
    private fb: FormBuilder,
    private format: FormattingModule,
    public dialogRef: MatDialogRef<AddSmDialogComponent>,
    private router: Router, private http: HttpClient,
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

  ngOnInit(): void {}

  /**
   * Returns false indicating the request has been canceled
   */
  cancelAdd() { this.dialogRef.close({ event: 'close', data: false }); }

  /**
   * Returns true indicating the request has been finished
   */
   ok() { this.dialogRef.close({ event: 'close', data: true }); }

  /**
   * Returns true from the dialogue if the care taker 
   * account request goes through.
   */
  addStaffMember() {
    var body = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      postalAddress: this.form.get('address')?.value,
      phoneNumber: this.form.get('phone')?.value,
      role: "staff"
    }

    // console.log(body);
    this.http.post<any>("api/users/", body, { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        // this.isIncorrectLogin = true;
      } else if(result.status == 200) {
        console.log(result.body);
        
        this.firstName = this.form.get('firstName')?.value,
        this.lastName = this.form.get('lastName')?.value
        this.username = result.body.username;
        this.password = result.body.pwd;
        this.isAdded = true;

      }
    }, err => {
      // this.isIncorrectLogin = true;
    });

    // this.dialogRef.close({ event: 'close', data: true }); 
  }
}
