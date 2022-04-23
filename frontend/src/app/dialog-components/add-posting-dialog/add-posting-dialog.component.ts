import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from 'src/app/modules/snackbar/snackbar.module';
import { HIRING_EDUCATION, HCP_LABELS } from 'src/app/global-variables';

@Component({
  selector: 'app-add-posting-dialog',
  templateUrl: './add-posting-dialog.component.html',
  styleUrls: ['./add-posting-dialog.component.css']
})
export class AddPostingDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  // getters for global lists for dropdowns
  get hiringEducation() { return HIRING_EDUCATION; }
  get hcpLabels() {return HCP_LABELS};
  

  // form for dialog
  form: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient,
    private snackbar: SnackbarModule,
    public dialogRef: MatDialogRef<AddPostingDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) {
      this.form = this.fb.group({
        Type: ['', Validators.required],
        Experience: ['', [Validators.required, Validators.pattern("[0-9]*")]],
        Qualifications: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z .]*")]],
        Education: ['', [Validators.required]]
      }, {});
    }

  ngOnInit(): void {}

  /**
   * Asks backend to create a new application from form values
   */
  create(){
    var body = {
      typeHS: this.form.get("Type")?.value,
      qualification: this.form.get("Qualifications")?.value,
      education: this.form.get("Education")?.value,
      yearOExp: this.form.get("Experience")?.value
    }

    this.http.post<any>("api/applications/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to submit new application. Please try again.")
      } else if(result.status == 200) {
        this.snackbar.openSnackbarSuccessCust("New Applicaion Successfully Submitted!");
        this.dialogRef.close({ event: 'close', data: true });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust(err.error.error);
    });
  }

  // close dialogue with false state
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }
}
