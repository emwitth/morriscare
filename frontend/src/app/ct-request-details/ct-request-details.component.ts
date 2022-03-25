import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { ActivatedRoute } from '@angular/router';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { CTRequest, requestInformation } from '../interfaces/CTRequest';
import { Roles, DAYS, HCP_TYPE } from '../global-variables';

@Component({
  selector: 'app-ct-request-details',
  templateUrl: './ct-request-details.component.html',
  styleUrls: ['./ct-request-details.component.css']
})
export class CtRequestDetailsComponent implements OnInit {
  hcpPickers: Array<requestInformation> = new Array<requestInformation>()
  request!: CTRequest;
  id = this.route.snapshot.params?.id;
  userType: string = "";
  isFlexibleHours: boolean = false;
  wantsGender: boolean = false;
  wantsAge: boolean = false;
  enabled: Array<boolean> = [false, false, false, false, false, false, false];


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
        if(this.request.requirements?.minAge != null 
        && this.request.requirements?.maxage != null) {
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

        // add initial hcp picker
        this.add();
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch request " + this.id + ":" + err.error.error);
    });

    // set role of current user for correct navigation back to /role/applications
    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};

  getDaysString(arr: Array<number>): string {
    console.log(arr);
    if(arr.length == 0) {
      return "none";
    }

    var daysString: string = '';
    arr.forEach((element : number) => {
      if(DAYS.sunday == element) {
        daysString += "Sunday, "
      }
      if(DAYS.monday == element) {
        daysString += "Monday, "
      }
      if(DAYS.tuesday == element) {
        daysString += "Tuesday, "
      }
      if(DAYS.wednesday == element) {
        daysString += "Wednesday, "
      }
      if(DAYS.thursday == element) {
        daysString += "Thursday, "
      }
      if(DAYS.friday == element) {
        daysString += "Friday, "
      }
      if(DAYS.saturday == element) {
        daysString += "Saturday, "
      }
    });
    return daysString.substring(0, daysString.length-2);
  }

  add() {
    var info: requestInformation = {
      enabled: this.enabled,
      id: this.id,
      isFlex: this.isFlexibleHours,
      start: this.request.requirements?.startTime,
      end: this.request.requirements?.endTime
    };
    console.log(info);
    this.hcpPickers.push(info);
  }

}
