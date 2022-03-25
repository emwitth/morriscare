import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';
import { DAYS, HCP_TYPE } from '../global-variables';

export interface flexibleObject {
  [key: string]: any
}

@Component({
  selector: 'app-ct-request',
  templateUrl: './ct-request.component.html',
  styleUrls: ['./ct-request.component.css']
})
export class CtRequestComponent implements OnInit {

  patientForm: FormGroup;
  typeForm: FormGroup;
  dateForm: FormGroup;
  specificHoursForm: FormGroup;
  flexibleHoursForm: FormGroup;
  daysForm: FormGroup;
  genderForm: FormGroup;
  ageForm: FormGroup;

  today: Date = new Date();

  numberOfDays:number = 0;

  wantsGender: boolean = false;
  wantsAge: boolean = false;
  isFlexibleHours: boolean = false;

  constructor(private fb: FormBuilder, private format: FormattingModule,
    private snackbar: SnackbarModule, private http: HttpClient) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      sex: ['', Validators.required],
      dob: [new Date(), Validators.required],
      location: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9., -]*")]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.typeForm = this.fb.group({
      type: ['', Validators.required]
    });
    this.dateForm = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });
    this.specificHoursForm = this.fb.group({
      startTime: ['', [Validators.required, Validators.pattern("[0-9]{2}:((00)|(30))")]],
      endTime: ['', [Validators.required, Validators.pattern("[0-9]{2}:((00)|(30))")]]
    }, {validators: startBeforeEnd});
    this.daysForm = this.fb.group({
      monday:[],
      tuesday:[],
      wednesday:[],
      thursday:[],
      friday:[],
      saturday:[],
      sunday:[],
    });
    this.genderForm = this.fb.group({
      gender: ['', Validators.required]
    });
    this.flexibleHoursForm = this.fb.group({
      hours: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    });
    this.ageForm = this.fb.group({
      min: ['', [Validators.required, Validators.min(18)]],
      max: ['', [Validators.required, Validators.min(18)]]
    }, {validators: minLTmax});
  }

  ngOnInit(): void {
  }

  submit() {

    var body = {
      takerID: 1,
      patientFirstName: this.patientForm.get("firstName")?.value,
      patientLastName: this.patientForm.get("lastName")?.value,
      sex: this.patientForm.get("sex")?.value,
      dateOfBirth: this.format.parseMomentDateToString(this.patientForm.get("dob")?.value),
      locationOfService: this.patientForm.get("location")?.value,
      patientPhoneNumber: this.patientForm.get("phone")?.value,
      patientEmail: this.patientForm.get("email")?.value,
      requirements: this.createRequirementsObject()
    }

    console.log("submitted: ", body);

    this.http.post<any>("api/requests/", body, { observe: "response" }).subscribe(result => {
      console.log(result);
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to submit request " + ": status " + result.status);
      } else if(result.status == 200) {
        this.snackbar.openSnackbarSuccessCust("Successfully submitted request!");
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to submit request: " + err /*? err.error.error : err.message*/);
    });
  }

  createRequirementsObject(): flexibleObject {

    var requirements : flexibleObject = {
      serviceType: this.typeForm.get("type")?.value,
      daysRequested: this.getDaysAsString(),
      numDaysRequested: this.numberOfDays
    }

    if(this.isFlexibleHours) {
      requirements.hoursPerDay = this.flexibleHoursForm.get("hours")?.value;
    }
    else {
      requirements.startTime = this.specificHoursForm.get("startTime")?.value;
      requirements.endTime = this.specificHoursForm.get("endTime")?.value;
    }

    if(this.wantsAge) {
      requirements.minAge = this.ageForm.get("min")?.value;
      requirements.maxAge = this.ageForm.get("max")?.value;
    }

    if(this.wantsGender) {
      requirements.gender = this.genderForm.get("gender")?.value;
    }

    return requirements;
  }

  getDaysAsString(): Array<number> {
    var daysArray = this.daysForm.value;
    var days: Array<number> = [];
    if(daysArray.sunday == true) {
      days.push(DAYS.sunday);
    }
    if(daysArray.monday == true) {
      days.push(DAYS.monday);
    }
    if(daysArray.tuesday == true) {
      days.push(DAYS.tuesday);
    }
    if(daysArray.wednesday == true) {
      days.push(DAYS.wednesday);
    }
    if(daysArray.thursday == true) {
      days.push(DAYS.thursday);
    }
    if(daysArray.friday == true) {
      days.push(DAYS.friday);
    }
    if(daysArray.saturday == true) {
      days.push(DAYS.saturday);
    }
    return days;
  }

  checkDisabledButton(): boolean {    
    // disable if patient form is not filled out
    if(this.patientForm.pristine || this.patientForm.invalid) {
      // console.log("patient failed");
      return true;
    }

    // disable if type form is not filled out
    if(this.typeForm.pristine || this.typeForm.invalid) {
      // console.log("type failed");
      return true;
    }

    // disable if date form is not filled out
    if(this.dateForm.pristine || this.dateForm.invalid) {
      // console.log("date failed");
      return true;
    }

    // disable if days form is not filled out
    if(this.daysForm.pristine || this.daysForm.invalid) {
      // console.log("days failed");
      return true;
    }

    // disable if flexible hours form is not filled out and flexible hours is specified
    if(this.isFlexibleHours && (this.flexibleHoursForm.pristine || this.flexibleHoursForm.invalid)) {
      // console.log("flexible failed");
      return true;
    }

    // disable if specific hours form is not filled out and flexible hours is not specified
     if(!this.isFlexibleHours && (this.specificHoursForm.pristine || this.specificHoursForm.invalid)) {
      // console.log("specific failed");
      return true
    }

    // disable if wants age and age form is not filled out
    if(this.wantsAge && (this.ageForm.pristine || this.ageForm.invalid)) {
      // console.log("age failed");
      return true
    }

    // disable if wants gender and age form is not filled out
    if(this.wantsGender && (this.genderForm.pristine || this.genderForm.invalid)) {
      // console.log("gender failed");
      return true
    }

    // console.log("all passed");

    return false;
  }

  figureDays() {
    var count = 0;
    var currentDate: Date = new Date(this.dateForm.get("startDate")?.value);
    var endDate: Date = new Date(this.dateForm.get("endDate")?.value);
    console.log(currentDate);
    console.log(endDate);
    while(currentDate <= endDate) {
      console.log(currentDate.getDay(), currentDate);
      count += this.incrementIfDay(currentDate.getDay());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log("count: ", count);
    this.numberOfDays = count;
  }

  incrementIfDay(day: number): number {
    if(day == 0 && this.daysForm.get("sunday")?.value == true ) {
      return 1;
    }
    else if(day == 1 && this.daysForm.get("monday")?.value == true ) {
      return 1;
    }
    else if(day == 2 && this.daysForm.get("tuesday")?.value == true ) {
      return 1;
    }
    else if(day == 3 && this.daysForm.get("wednesday")?.value == true ) {
      return 1;
    }
    else if(day == 4 && this.daysForm.get("thursday")?.value == true ) {
      return 1;
    }
    else if(day == 5 && this.daysForm.get("friday")?.value == true ) {
      return 1;
    }
    else if(day == 6 && this.daysForm.get("saturday")?.value == true ) {
      return 1;
    }
    else {
      return 0;
    }
  }

  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};

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

/**
 * Validator to ensure a min age is less than max age
 * 
 * @param g the form group
 * @returns a group-scoped validator function
 */
 function minLTmax(g: AbstractControl) {
  const minFC = g.get('min');
  const maxFC = g.get('max');

  const min = parseInt(minFC?.value);
  const max = parseInt(maxFC?.value);

  return min < max ? null : {'minGTMax': true};
}