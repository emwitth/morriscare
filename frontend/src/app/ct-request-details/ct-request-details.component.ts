import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { ActivatedRoute } from '@angular/router';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { CTRequest, Requirements } from '../interfaces/CTRequest';
import { Roles, DAYS } from '../global-variables';

@Component({
  selector: 'app-ct-request-details',
  templateUrl: './ct-request-details.component.html',
  styleUrls: ['./ct-request-details.component.css']
})
export class CtRequestDetailsComponent implements OnInit {
  hcpPickers: Array<number> = new Array<number>()
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
        this.request.requirements.daysRequested.forEach(day => {
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

    // add initial hcp picker
    this.add();
  }

  add() {
    console.log(this.hcpPickers.length);
    this.hcpPickers.push(this.hcpPickers.length);
  }

}
