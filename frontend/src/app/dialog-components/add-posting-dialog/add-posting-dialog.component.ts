import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from 'src/app/modules/snackbar/snackbar.module';

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
    private snackbar: SnackbarModule,
    public dialogRef: MatDialogRef<AddPostingDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) {
      this.form = this.fb.group({
        Type: ['', Validators.required],
        Qualifications: ['', [Validators.required, Validators.pattern("[A-Za-x0-9 ]*")]],
        Education: ['', [Validators.required, Validators.pattern("[A-Za-x0-9 ]*")]]
      }, {});
    }

  create(){
    console.log(this.form.get("Type")?.value);
    console.log(this.form.get("Qualifications")?.value);
    console.log(this.form.get("Education")?.value);
    // var body = {
    //   type: this.form.get("Type")?.value,
    //   qualifications: this.form.get("Qualifications")?.value,
    //   education: this.form.get("Education")?.value,
    // }

    // this.http.post<any>("api/auth/", body, { observe: "response" }).subscribe(result => {
    //   // console.log(result.body);
    //   if (result.status != 200) {
    //     this.snackbar.openSnackbarErrorCust("Failed to submit new application. Please try again.")
    //   } else if(result.status == 200) {
    //     this.snackbar.openSnackbarSuccessCust("New Applicaion Successfully Submitted!");
    //     this.dialogRef.close({ event: 'close', data: false });
    //   }
    // }, err => {
    //   this.snackbar.openSnackbarErrorCust("Failed to submit new application. Please try again.")
    // });
  }

  // close dialogue with false state
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  ngOnInit(): void {
  }

}
