import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { hcpApplicant } from './../interfaces/HCP';


@Component({
  selector: 'app-hcp-wage-view',
  templateUrl: './hcp-wage-view.component.html',
  styleUrls: ['./hcp-wage-view.component.css']
})
export class HcpWageViewComponent implements OnInit {

  info: hcpApplicant = {
    pID: -1,
    firstName: "unavailable",
    lastName: "unavailable",
    sex: "unavailable",
    ssn: "000000000",
    salary: -1,
    typeHS: -1,
    qualification: "unavailable",
    qualificationDate: "01/01/01",
    yearOExp: -1,
    phoneNumber: "0000000000",
    postalAddress: "unavailable",
    dateOfBirth: "unavailable",
    email: "unavailable",
    enroll: true,
    schedule: {},
    billingAccount: {
      total: -1,
      unPaidTotal: -1,
      paidTotal: -1,
      records: []
    },
    deleted: false,
    updateTime: "unavailable",
    advertiseID: -1,
    userID: -1
  }

  constructor(private snackbar: SnackbarModule, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("api/applicant/" + sessionStorage.pID + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch HCP details: " + result);
        console.log("Failed to fetch HCP " + sessionStorage.pID + "'s details: " + result);
      } else if(result.status == 200) {
        this.info = result.body;
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch HCP details: " + (err.error.error? err.error.error : err.message));
      console.log("Failed to fetch HCP " + sessionStorage.pID + "'s details: " + (err.error.error? err.error.error : err.message));
    });
  }

}
