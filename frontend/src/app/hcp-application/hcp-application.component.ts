import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { FormattingModule } from 'src/app/modules/formatting/formatting.module';
import { HIRING_REQUIREMENTS, HIRING_EDUCATION } from 'src/app/global-variables';

@Component({
  selector: 'app-hcp-application',
  templateUrl: './hcp-application.component.html',
  styleUrls: ['./hcp-application.component.css']
})
export class HcpApplicationComponent implements OnInit {
  // getters for global lists for dropdowns
  get hiringRequirements() { return HIRING_REQUIREMENTS; }
  get hiringEducation() { return HIRING_EDUCATION; }

  // variables passed in via route
  id: number = -1;
  type: string = "";

  // form
  form: FormGroup;

  today: Date = new Date();

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private http: HttpClient, private snackbar: SnackbarModule,
    private format: FormattingModule) { 
    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
      last: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]*")]],
      dob: [new Date(), Validators.required],
      ssn: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      experience: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      education: ['', Validators.required],
      qualifications: ['', Validators.required]
    }, {});
  }

  
  ngOnInit(): void {
    // get the values from the route for use later
    this.id = this.route.snapshot.params?.id;
    this.type = this.route.snapshot.params?.type;
  }

  submit(){
    // put all form values in an object
    var body = {
      firstName: this.form.get("first")?.value,
      lastName: this.form.get("last")?.value,
      email: this.form.get("email")?.value,
      sex: this.form.get("sex")?.value,
      ssn: this.form.get("ssn")?.value,
      typeHS: this.type == 'nurse' ? 'n' : (this.type == 'physiotherapist' ? 'p' : 'ps'),
      qualification: this.form.get("education")?.value +  " Degree, I am "
      + this.form.get("qualifications")?.value,
      qualificationDate: this.format.parseMomentDateToString(this.form.get("dob")?.value),
      yearOExp: this.form.get("experience")?.value,
      phoneNumber: this.form.get("phone")?.value,
      postalAddress: this.form.get("address")?.value,
    }
    
    // post to the backend
    this.http.post<any>("api/applicants/" + this.id + "/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust(result.body);
      } else if(result.status == 200) {
        console.log("200", result);
        this.snackbar.openSnackbarSuccessCust("Application Successfully Sent, watch your email for more information!");
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust(err.error.error);
    });
  }
}
