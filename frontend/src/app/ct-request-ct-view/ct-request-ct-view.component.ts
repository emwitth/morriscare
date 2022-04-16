import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from './../modules/snackbar/snackbar.module';
import { CTRequest, AssignmentObject } from '../interfaces/CTRequest';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { HCP_LABELS, HCP_TYPE } from '../global-variables';

@Component({
  selector: 'app-ct-request-ct-view',
  templateUrl: './ct-request-ct-view.component.html',
  styleUrls: ['./ct-request-ct-view.component.css']
})
export class CtRequestCtViewComponent implements OnInit {

  requests: Array<CTRequest> = [];
  pendingRequests: Array<CTRequest> = [];
  terminatedRequests: Array<CTRequest> = [];

  isShown: boolean = false;
  selected: CTRequest = {
    requestID: -1,
    terminate: false,
    patientFirstName: "unavailable",
    patientLastName: "unavailable",
    sex: "unavailable",
    dateOfBirth: "0/0/0",
    locationOfService: "unavailable",
    patientPhoneNumber: "0000000000",
    patientEmail: "unavailable",
    hourlyRate: 0,
    requirements: {
      serviceType: -1,
      daysRequested: [],
      startDate: "0/0/0",
      endDate: "0/0/0"
    },
    distribution: {
      assigned: [],
      unassigned: []
    },
    deleted: false,
    updateTime: "unavailable",
    billingAccount: {
      total: -1,
      unPaidTotal: -1,
      paidTotal: -1,
      records: []
    },
    userID: -1
  };
  names: Array<string> = [];
  isFlexibleHours: boolean = false;
  wantsGender: boolean = false;
  wantsAge: boolean = false;
  today: Date = new Date();

  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};
  get hcpLabels() {return HCP_LABELS};

  constructor(private http: HttpClient, private snackbar: SnackbarModule,
    public format: FormattingModule) { }

  ngOnInit(): void {
    // retrieve all the requests
    this.http.get<any>("api/requests/?userID=" + sessionStorage.getItem("id"), { observe: "response" }).subscribe(result => {
    if (result.status != 200) {
      this.snackbar.openSnackbarErrorCust("Failed to fetch requests: status " + result.status);
    } else if(result.status == 200) {
      result.body.forEach((element: CTRequest) => {
        var startDate: Date = this.format.parseDate(element.requirements.startDate);
        var endDate: Date = this.format.parseDate(element.requirements.endDate);
        console.log(startDate, endDate);
        console.log(startDate.getTime() <= this.today.getTime());
        console.log(endDate.getTime() >= this.today.getTime());
        if(startDate.getTime() <= this.today.getTime() && endDate.getTime() >= this.today.getTime()) {
          this.requests.push(element);
        }
        else if(element.deleted == true) {
          this.terminatedRequests.push(element);
        }
        else {
          this.pendingRequests.push(element);
        }
      });
    }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch requests: " + err.error.error);
    });
  }

  selectTab(request: CTRequest) {
    this.selected = request;
    this.isShown = true;

    this.wantsAge = false;
    this.wantsGender = false;
    this.isFlexibleHours = false;

    if(this.selected.requirements?.hoursPerDay != null) {
      this.isFlexibleHours = true;
    }
    if(this.selected.requirements?.age_min != null 
    && this.selected.requirements?.age_max != null) {
      this.wantsAge = true;
    }
    if(this.selected.requirements?.gender != null) {
      this.wantsGender = true;
    }

    this.names = [];
    this.selected.distribution.assigned.forEach((element: AssignmentObject) => {
      this.http.get<any>("api/applicant/" + element.hcp + "/", { observe: "response" }).subscribe(result => {
        if (result.status != 200) {
          console.log("!200", result.body);
          this.snackbar.openSnackbarErrorCust("Error retrieving hcp " + element.hcp + ": " + result);
        } else if(result.status == 200) {
          this.names.push(result.body.firstName + " " + result.body.lastName);
        }
      }, err => {
        console.log("err", err);
        this.snackbar.openSnackbarErrorCust(err.error.error? err.error.error : err.message);
      });
    });
  }

}
