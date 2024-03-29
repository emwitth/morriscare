import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { CTRequest, AssignmentObject } from '../interfaces/CTRequest';
import { HCP_TYPE, HCP_LABELS } from '../global-variables';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { Withdrawal } from '../interfaces/Withdrawal-Termination';
import { CareTaker } from '../interfaces/CareTaker';

@Component({
  selector: 'app-ct-request-manage',
  templateUrl: './ct-request-manage.component.html',
  styleUrls: ['./ct-request-manage.component.css']
})
export class CtRequestManageComponent implements OnInit {

  current: Array<CTRequest> = new Array<CTRequest>();
  pending: Array<CTRequest> = new Array<CTRequest>();
  terminated: Array<CTRequest> = new Array<CTRequest>();
  withdrawn: Array<CTRequest> = new Array<CTRequest>();
  completed: Array<CTRequest> = new Array<CTRequest>();

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
    end: false,
    userID: -1
  };
  names: Array<string> = [];
  isFlexibleHours: boolean = false;
  wantsGender: boolean = false;
  wantsAge: boolean = false;
  today: Date = new Date();
  withdrawnRequestIDs: Set<number> = new Set();
  withdrawnRequestServiceIDs: Map<number, number> = new Map();
  completedRequestIDs: Set<number> = new Set();
  careTakers: Map<number, string> = new Map();

  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};
  get hcpLabels() {return HCP_LABELS};

  constructor(private http: HttpClient, private snackbar: SnackbarModule,
    public format: FormattingModule) { }

  ngOnInit(): void {
    //retrieve all caretakers
    this.http.get<any>("api/users/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust("Error retrieving care takers: status " + result.status);
      } else if(result.status == 200) {
        result.body.forEach((element: CareTaker) => {
          this.careTakers.set(element.userID, element.firstName + " " + element.lastName);
        });
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust("Error retrieving care takers: " + (err.error.error? err.error.error : err.message));
    });
    //retrieve all requests that are withdrawn
    this.http.get<any>("api/service/?takerID=" + sessionStorage.ctID, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch withdrawn requests: status " + result.status);
      } else if(result.status == 200) {
        result.body.forEach((element: Withdrawal) => {
          if(element.status === "pending") {
            this.withdrawnRequestIDs.add(element.request);
            this.withdrawnRequestServiceIDs.set(element.request, element.serviceID);
          }
        });
        console.log(this.withdrawnRequestIDs);
        // retrieve all the requests
    this.http.get<any>("api/requests/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch requests: status " + result.status);
      } else if(result.status == 200) {
        result.body.forEach((element: CTRequest) => {
          console.log(element);
          var startDate: Date = element.requirements.startDate ? this.format.parseDate(element.requirements.startDate) : new Date();
          var endDate: Date = element.requirements.endDate ? this.format.parseDate(element.requirements.endDate) : new Date();
          if(element.end == true) {
            this.terminated.push(element);
          }
          else if(this.withdrawnRequestIDs.has(element.requestID)) {
            this.withdrawn.push(element);
          }
          else if(startDate.getTime() <= this.today.getTime() && endDate.getTime() >= this.today.getTime()) {
            this.current.push(element);
          }
          else if(endDate.getTime() < this.today.getTime()) {
            this.completed.push(element);
            this.completedRequestIDs.add(element.requestID);
          }
          else {
            this.pending.push(element);
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch requests: " + err.error.error);
    });
      }
      }, err => {
        this.snackbar.openSnackbarErrorCust("Failed to fetch withdrawn requests: " + err.error.error);
      })
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
        this.snackbar.openSnackbarErrorCust("Error retrieving hcp: " + (err.error.error? err.error.error : err.message));
      });
    });
  }

  terminate() {
    this.http.get<any>("api/end_request/" + this.selected.requestID + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust("Error terminating request: result " + result);
      } else if(result.status == 200) {
        window.location.reload();
        // this.snackbar.openSnackbarSuccessCust("Successfully terminated request!");
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust("Error retrieving request: " + (err.error.error? err.error.error : err.message));
    });
  }

  terminateWithdrawn() {
    var body = {
      serviceID: this.withdrawnRequestServiceIDs.get(this.selected.requestID),
      status: "success"
    }
    console.log(body);
    this.http.put<any>("api/service/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to terminate withdrawn request: status " + result.status);
      } else if(result.status == 200) {
        window.location.reload();
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to terminate withdrawn request: " + err.error.error);
    });
      console.log(this.withdrawnRequestIDs);
  }
}
