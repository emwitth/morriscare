import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { ActivatedRoute } from '@angular/router';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { CTRequest, requestInformation, AssignmentObject, Caretaker } from '../interfaces/CTRequest';
import { Roles, DAYS, HCP_TYPE, HCP_LABELS } from '../global-variables';

@Component({
  selector: 'app-ct-request-details',
  templateUrl: './ct-request-details.component.html',
  styleUrls: ['./ct-request-details.component.css']
})
export class CtRequestDetailsComponent implements OnInit {
  hcpPickers: Array<requestInformation> = new Array<requestInformation>()
  // these have default values in case an error occurs when fetching them
  request: CTRequest = {
    requestID: -1,
    terminate: false,
    patientFirstName: "unavailable",
    patientLastName: "unavailable",
    sex: "unavailable",
    dateOfBirth: "1/1/1",
    locationOfService: "unavailable",
    patientPhoneNumber: "unavailable",
    patientEmail: "unavailable",
    hourlyRate: 0,
    requirements: {
      serviceType: -1,
      daysRequested: [],
      startDate: "1/1/1",
      endDate: "1/1/1"
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
  caretaker: Caretaker = {
    userID: -1,
    username: "unavailable",
    lastName: "unavailable",
    firstName: "unavailable",
    phoneNumber: "0000000000",
    postalAddress: "unavailable",
    email: "unavailable"
  };

  id = this.route.snapshot.params?.id;
  userType: string = "";
  isFlexibleHours: boolean = false;
  wantsGender: boolean = false;
  wantsAge: boolean = false;
  enabled: Array<boolean> = [false, false, false, false, false, false, false];

  // the getters for access to global variables in html
  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};
  get hcpLabels() {return HCP_LABELS};

  constructor( private http: HttpClient, private snackbar: SnackbarModule, 
    private route: ActivatedRoute, public format: FormattingModule ) { }

  ngOnInit(): void {
    // retrieve a single request
    this.http.get<any>("api/request/" + this.id + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch request " + this.id + ": status " + result.status);
      } else if(result.status == 200) {
        this.request = result.body;
        if(this.request.requirements?.hoursPerDay != null) {
          this.isFlexibleHours = true;
        }
        if(this.request.requirements?.age_min != null 
        && this.request.requirements?.age_max != null) {
          this.wantsAge = true;
        }
        if(this.request.requirements?.gender != null) {
          this.wantsGender = true;
        }
        // set enabled array
        this.request.distribution.unassigned.forEach(day => {
          if(day == DAYS.sunday) {
            this.enabled[DAYS.sunday] = true;
          }
          if(day == DAYS.monday) {
            this.enabled[DAYS.monday] = true;
          }
          if(day == DAYS.tuesday) {
            this.enabled[DAYS.tuesday] = true;
          }
          if(day == DAYS.wednesday) {
            this.enabled[DAYS.wednesday] = true;
          }
          if(day == DAYS.thursday) {
            this.enabled[DAYS.thursday] = true;
          }
          if(day == DAYS.friday) {
            this.enabled[DAYS.friday] = true;
          }
          if(day == DAYS.saturday) {
            this.enabled[DAYS.saturday] = true;
          }
        });

        // add initial hcp pickers
        this.request.distribution.assigned.forEach((pair: AssignmentObject) => {
          this.addPastPicker(pair);
        });

        // get the information for the caretaker associated with this request
        this.http.get<any>("api/user/" + this.request.userID + "/", { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            console.log("!200", result.body);
            this.snackbar.openSnackbarErrorCust("Error retrieving caretaker " + this.request.userID + ": " + result);
          } else if(result.status == 200) {
            console.log(result);
            this.caretaker = result.body;
          }
        }, err => {
          console.log("err", err);
          this.snackbar.openSnackbarErrorCust("Failed to fetch caretaker information: " + (err.error.error? err.error.error : err.message));
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch request " + this.id + ":" + (err.error.error? err.error.error : err.message));
    });

    // set role of current user for correct navigation back to /role/applications
    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

  /**
   * Adds a picker that hasn't been used yet
   */
  add() {
    var info: requestInformation = {
      enabled: this.enabled,
      checked: [false, false, false, false, false, false, false],
      id: this.id,
      isFlex: this.isFlexibleHours,
      isPastPicker: false,
      pID: -1,
      scheduleId: -1,
      start: this.request.requirements?.startTime,
      end: this.request.requirements?.endTime
    };
    console.log(info);
    this.hcpPickers.push(info);
  }

  /**
   * Adds a picker that came from past use of the page
   * 
   * @param data the old data
   */
  addPastPicker(data: AssignmentObject) {
    console.log("DATA: ", data);
    var info: requestInformation = {
      enabled: [false, false, false, false, false, false, false],
      checked: [false, false, false, false, false, false, false],
      id: this.id,
      isFlex: this.isFlexibleHours,
      isPastPicker: true,
      pID: data.hcp,
      scheduleId: data.schedule.scheduleID,
      start: this.request.requirements?.startTime,
      end: this.request.requirements?.endTime
    };
    data.schedule.daysRequested.forEach(day => {
      if(day == DAYS.sunday) {
        info.checked[DAYS.sunday] = true;
      }
      if(day == DAYS.monday) {
        info.checked[DAYS.monday] = true;
      }
      if(day == DAYS.tuesday) {
        info.checked[DAYS.tuesday] = true;
      }
      if(day == DAYS.wednesday) {
        info.checked[DAYS.wednesday] = true;
      }
      if(day == DAYS.thursday) {
        info.checked[DAYS.thursday] = true;
      }
      if(day == DAYS.friday) {
        info.checked[DAYS.friday] = true;
      }
      if(day == DAYS.saturday) {
        info.checked[DAYS.saturday] = true;
      }
    });
    console.log(info);
    this.hcpPickers.push(info);
  }

  /**
   * Marks just assigned days as unavailable for subsequent booleans
   * 
   * @param arr the array indicating what days were just assigned
   */
  mergeNewAssigned(arr: Array<boolean>) {
    for(var i: number = 0; i < arr.length; i++) {
      if(arr[i]) {
        this.enabled[i] = false;
      }
    }
    window.location.reload();
  }

}
