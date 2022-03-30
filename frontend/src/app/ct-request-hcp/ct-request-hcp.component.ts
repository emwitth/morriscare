import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';
import { DAYS } from '../global-variables';
import { requestInformation } from '../interfaces/CTRequest';

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
  @Output() assignmentEvent = new EventEmitter<Array<boolean>>();

  hcpForm: FormGroup;
  timeForm: FormGroup;

  daysChecked: Array<boolean> = [false, false, false, false, false, false, false]

  hcps: Array<any> = [];
  hasBeenPressed: boolean = false; // indicates whether the dropdown filling button has been filled at least once
  isDisabled: boolean = false; // indicates whether this whole thing is disabled
  // TODO: figure out how to disable the stupid time inputs. They don't want to cooperate

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
    this.timeForm = this.fb.group({
      startTime:['', Validators.required],
      endTime:['', Validators.required]
    }, {validators: startBeforeEnd});
    this.hcpForm = this.fb.group({
      hcpID:['', Validators.required],
    });
   }

  ngOnInit(): void {
    for(var i: number = 0; i < this.daysChecked.length; i++) {
      this.daysChecked[i] = this.info.checked[i];
    }

    // if this picker is coming from past work and
    // not the add button, this means it is already decided
    if(this.info.isPastPicker) {
      // we don't at this time want to change past assignments
      this.isDisabled = true;
      // it was pressed in a past viewing of this request
      this.hasBeenPressed = true;
      // we want to display who was chosen also, we get them from the pID we passed in from the parent component
      this.http.get<any>("api/applicant/" + this.info.pID + "/", { observe: "response" }).subscribe(result => {
        if (result.status != 200) {
          console.log("!200", result.body);
          this.snackbar.openSnackbarErrorCust("Error retrieving hcp " + this.info.pID + ": " + result);
        } else if(result.status == 200) {
          this.hcps = [];
          console.log("200", result);
          this.hcps.push(result.body);
          this.hasBeenPressed = true;
        }
      }, err => {
        console.log("err", err);
        this.snackbar.openSnackbarErrorCust(err.error.error? err.error.error : err.message);
      });
    }
  }

  getAvailableHCPs() {
    // create days array
    var days: Array<number> = [];
    if(this.daysChecked[this.SUNDAY] == true) {days.push(DAYS.sunday)};
    if(this.daysChecked[this.MONDAY] == true) {days.push(DAYS.monday)};
    if(this.daysChecked[this.TUESDAY] == true) {days.push(DAYS.tuesday)};
    if(this.daysChecked[this.WEDNESDAY] == true) {days.push(DAYS.wednesday)};
    if(this.daysChecked[this.THURSDAY] == true) {days.push(DAYS.thursday)};
    if(this.daysChecked[this.FRIDAY] == true) {days.push(DAYS.friday)};
    if(this.daysChecked[this.SATURDAY] == true) {days.push(DAYS.saturday)};

    // the body varies depending on what kind of request this was
    var body;
    if(this.info.isFlex) {
      body = {
        daysRequested: days,
        startTime: this.timeForm.get("startTime")?.value,
        endTime: this.timeForm.get("endTime")?.value
      }
    }
    else {
      body = {
        daysRequested: days
      }
    }

    // post information querying and recieve a list of available and qualifying hcps back
    this.http.post<any>("api/available_hcp/" + this.info.id + "/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust("Error retrieving hcps: " + result);
      } else if(result.status == 200) {
        this.hcps = [];
        console.log("200", result);
        result.body.forEach((hcp: hcpsForDropdown) => {
          if(hcp.schedule.available == true) {
            this.hcps.push(hcp);
          }
        });
        this.hasBeenPressed = true;
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust(err.error.error? err.error.error : err.message);
    });
  }

  assign() {
    // create days array
    var days: Array<number> = [];
    if(this.daysChecked[this.SUNDAY] == true) {days.push(DAYS.sunday)};
    if(this.daysChecked[this.MONDAY] == true) {days.push(DAYS.monday)};
    if(this.daysChecked[this.TUESDAY] == true) {days.push(DAYS.tuesday)};
    if(this.daysChecked[this.WEDNESDAY] == true) {days.push(DAYS.wednesday)};
    if(this.daysChecked[this.THURSDAY] == true) {days.push(DAYS.thursday)};
    if(this.daysChecked[this.FRIDAY] == true) {days.push(DAYS.friday)};
    if(this.daysChecked[this.SATURDAY] == true) {days.push(DAYS.saturday)};

    // changes depending on what type of request this is
    var body;
    if(this.info.isFlex) {
      body = {
        pID: this.hcpForm.get("hcpID")?.value,
        requestID: this.info.id,
        daysRequested: days,
        startTime: this.timeForm.get("startTime")?.value,
        endTime: this.timeForm.get("endTime")?.value,
        flexibleTime: true
      }
    }
    else {
      body = {
        pID: this.hcpForm.get("hcpID")?.value,
        requestID: this.info.id,
        daysRequested: days
      }
    }

    // post assignment request to backend
    this.http.post<any>("api/assign/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust("Error assigning hcp: " + result.status);
      } else if(result.status == 200) {
        console.log("200", result);
        this.isDisabled = true;
        this.snackbar.openSnackbarSuccessCust("Successfully Assigned!");
        this.assignmentEvent.emit(this.daysChecked);
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust(err.error.error ? err.error.error : err.message);
    });
  }

  /**
   * Returns a boolean value indicating whether hcp fetching button is disabled or not...
   * 
   * @returns a boolean value indicating whether hcp fetching button is disabled or not
   */
  checkEnabled(): boolean {
    var result: boolean = false;

    result = result || this.daysChecked[this.SUNDAY];
    result = result || this.daysChecked[this.MONDAY];
    result = result || this.daysChecked[this.TUESDAY];
    result = result || this.daysChecked[this.WEDNESDAY];
    result = result || this.daysChecked[this.THURSDAY];
    result = result || this.daysChecked[this.FRIDAY];
    result = result || this.daysChecked[this.SATURDAY];

    if(this.info.isFlex && (this.timeForm.invalid || this.timeForm.pristine)) {
      result = false;
    }

    return result;
  }
}

/**
 * Validator to ensure a start time is before end time
 * 
 * @param g the form group
 * @returns a group-scoped validator function
 */
 function startBeforeEnd(g: AbstractControl) {
  const st = g.get('startTime');
  const et = g.get('endTime');

  const sh = parseInt(st?.value.substring(0,2));
  const sm = parseInt(st?.value.substring(3,5));
  const eh = parseInt(et?.value.substring(0,2));
  const em = parseInt(et?.value.substring(3,5));

  if (sh > eh) {
    return {'startAfterEnd': true};
  }
  else if ( sh == eh && sm > em) {
    return {'startAfterEnd': true};
  }
  else {
    return null;
  }
}
