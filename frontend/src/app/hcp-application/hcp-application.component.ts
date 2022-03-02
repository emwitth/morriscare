import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hcp-application',
  templateUrl: './hcp-application.component.html',
  styleUrls: ['./hcp-application.component.css']
})
export class HcpApplicationComponent implements OnInit {
  id: number = -1;
  type: string = "";

  // forms
  form: FormGroup;

  today: Date = new Date();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient) { 
    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
      last: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]*")]],
      dob: ['', Validators.required],
      ssn: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      experience: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      qualifications: ['', Validators.required]
    }, {});
  }

  submit(){
    console.log("first", this.form.get("first")?.value);
    console.log("last", this.form.get("last")?.value);
    console.log("phone", this.form.get("phone")?.value);
    console.log("email", this.form.get("email")?.value);
    console.log("sex", this.form.get("sex")?.value);
    console.log("address", this.form.get("address")?.value);
    console.log("dob", this.form.get("dob")?.value);
    console.log("ssn", this.form.get("ssn")?.value);
    console.log("experience", this.form.get("experience")?.value);
    console.log("qualifications", this.form.get("qualifications")?.value);

    var body = {
      firstName: this.form.get("first")?.value,
      lastName: this.form.get("last")?.value,
      email: this.form.get("email")?.value,
      sex: this.form.get("sex")?.value,
      phoneNumber: this.form.get("phone")?.value,
      address: this.form.get("address")?.value,
      dateOfBirth: this.form.get("dob")?.value,
      ssn: this.form.get("ssn")?.value,
      yearsOfExperience: this.form.get("experience")?.value,
      qualifications: this.form.get("qualifications")?.value
    }
    
    // this.http.post<any>("api/application/" + this.id + "/applicant", body, { observe: "response" }).subscribe(result => {
    //   if (result.status != 200) {
    //     //
    //   } else if(result.status == 200) {

    //   }
    // }, err => {
    //   //
    // });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.id;
    this.type = this.route.snapshot.params?.type;

    console.log(this.type, this.id);

    console.log(this.today);
  }

}