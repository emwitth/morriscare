import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';
import { DAYS } from '../global-variables';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

export interface requestInformation {
  enabled: Array<boolean>,
  id: number
}

export interface hcpsForDropdown {
    pID: number,
    firstName: string,
    lastName: string,
    sex: string,
    ssn: string,
    salary: number,
    typeHS: string,
    qualification: string,
    qualificationDate: string,
    yearOExp: number,
    phoneNumber: string,
    postalAddress: string,
    email: string,
    enroll: boolean,
    schedule: {
        available: boolean
    },
    deleted: boolean,
    advertiseID: number,
    userID: number
}

@Component({
  selector: 'app-ct-request-hcp',
  templateUrl: './ct-request-hcp.component.html',
  styleUrls: ['./ct-request-hcp.component.css']
})
export class CtRequestHcpComponent implements OnInit {
  @Input('info') info!: requestInformation;

  daysForm: FormGroup;
  hcps: Array<any> = [];

  // get accesssors for days enum
  get SUNDAY() { return DAYS.sunday; };
  get MONDAY() { return DAYS.monday; };
  get TUESDAY() { return DAYS.tuesday; };
  get WEDNESDAY() { return DAYS.wednesday; };
  get THURSDAY() { return DAYS.thursday; };
  get FRIDAY() { return DAYS.friday; };
  get SATURDAY() { return DAYS.saturday; };

  constructor(private fb: FormBuilder, private snackbar: SnackbarModule,
    private http: HttpClient) {
    this.daysForm = this.fb.group({
      monday:[],
      tuesday:[],
      wednesday:[],
      thursday:[],
      friday:[],
      saturday:[],
      sunday:[],
    });
   }

  ngOnInit(): void {
  }

  getAvailableHCPs() {
    // create days array
    var days: Array<number> = [];
    if(this.daysForm.get("sunday")?.value == true) {days.push(DAYS.sunday)};
    if(this.daysForm.get("monday")?.value == true) {days.push(DAYS.monday)};
    if(this.daysForm.get("tuesday")?.value == true) {days.push(DAYS.tuesday)};
    if(this.daysForm.get("wednesday")?.value == true) {days.push(DAYS.wednesday)};
    if(this.daysForm.get("thursday")?.value == true) {days.push(DAYS.thursday)};
    if(this.daysForm.get("friday")?.value == true) {days.push(DAYS.friday)};
    if(this.daysForm.get("saturday")?.value == true) {days.push(DAYS.saturday)};

    var body = {
      daysRequested: days
    }

    this.http.post<any>("api/available_hcp/" + this.info.id + "/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust("Error retrieving hcp: " + result);
      } else if(result.status == 200) {
        this.hcps = [];
        console.log("200", result);
        result.body.forEach((hcp: hcpsForDropdown) => {
          if(hcp.schedule.available == true) {
            this.hcps.push(hcp);
          }
        });
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust(err.error.error);
    });
  }

}
