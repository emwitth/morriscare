import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';
import { DAYS, HCP_TYPE, HCP_LABELS } from '../global-variables';
import { Requirements } from '../interfaces/CTRequest';

@Component({
  selector: 'app-ct-request',
  templateUrl: './ct-request.component.html',
  styleUrls: ['./ct-request.component.css']
})
export class CtRequestComponent implements OnInit {

  psychBadTime: boolean = false;
  nursePhysioBadTime: boolean = false;

  // forms that compose the whole page's form
  patientForm: FormGroup;
  dateForm: FormGroup;
  specificHoursForm: FormGroup;
  flexibleHoursForm: FormGroup;
  daysForm: FormGroup;
  genderForm: FormGroup;
  ageForm: FormGroup;
  typeForm: FormGroup;

  today: Date = new Date();

  // the number of days they requested, gets calculated later
  numberOfDays:number = 0;

  // indicates whether the user specifies certain things
  wantsGender: boolean = false;
  wantsAge: boolean = false;
  isFlexibleHours: boolean = false;

  // the getters for access to global variables in html
  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};
  get hcpLabels() {return HCP_LABELS};

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
      type: [0, Validators.required]
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

    // the body with information for a request sumission
    var body = {
      userID: sessionStorage.getItem("id"),
      patientFirstName: this.patientForm.get("firstName")?.value,
      patientLastName: this.patientForm.get("lastName")?.value,
      sex: this.patientForm.get("sex")?.value,
      dateOfBirth: this.format.parseMomentDateToString(this.patientForm.get("dob")?.value),
      locationOfService: this.patientForm.get("location")?.value,
      patientPhoneNumber: this.patientForm.get("phone")?.value,
      patientEmail: this.patientForm.get("email")?.value,
      requirements: this.createRequirementsObject() // the actual values included here vary
    }

    // post the body
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

  /**
   * Returns an object with the fields specified in the form
   * 
   * @returns the appropriate requirements object
   */
  createRequirementsObject(): Requirements {

    // these things are in all versions of the requirements object
    var requirements : Requirements = {
      serviceType: this.typeForm.get("type")?.value,
      daysRequested: this.getDaysAsArray(),
      numDaysRequested: this.numberOfDays,
      startDate: this.format.parseMomentDateToString(this.dateForm.get("startDate")?.value),
      endDate: this.format.parseMomentDateToString(this.dateForm.get("endDate")?.value)
    }

    // if flexible hours, store number of hours wanted
    if(this.isFlexibleHours) {
      requirements.flexibleTime = true;
      requirements.hoursPerDay = this.flexibleHoursForm.get("hours")?.value;
    }
    // if not flexible hours, store times indicated
    else {
      requirements.startTime = this.specificHoursForm.get("startTime")?.value;
      requirements.endTime = this.specificHoursForm.get("endTime")?.value;
    }

    // if age values specified, include them
    if(this.wantsAge) {
      requirements.age_min = this.ageForm.get("min")?.value;
      requirements.age_max = this.ageForm.get("max")?.value;
    }

    // if gender specified, include it
    if(this.wantsGender) {
      requirements.gender = this.genderForm.get("gender")?.value;
    }

    return requirements;
  }

  /**
   * Creates an array to store the wanted weekdays
   * 
   * @returns an array containing the weekdays as numbers
   */
  getDaysAsArray(): Array<number> {
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

  /**
   * Used to disable the button if the form is not filled out entirely
   * 
   * @returns boolean indicating the button should be enabled
   */
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

    // disable if time is bad for the hcp type
    if(this.psychBadTime || this.nursePhysioBadTime) {
      return true;
    }

    // console.log("all passed");

    return false;
  }

  /**
   * Calculates the number of days specified, puts this value in the numberOfDays
   * global variable above. This is displayed in the html.
   */
  figureDays() {
    var count = 0;
    var currentDate: Date = new Date(this.dateForm.get("startDate")?.value);
    var endDate: Date = new Date(this.dateForm.get("endDate")?.value);
    // loop through all days and add one to each day that is the same as one marked
    while(currentDate <= endDate) {
      console.log(currentDate.getDay(), currentDate);
      count += this.incrementIfDay(currentDate.getDay());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.numberOfDays = count;
  }

  /**
   * 
   * Returns the number with which to increase the counter by
   * at each day of the week. To be used in a loop above.
   * 
   * @param day a number representing the day of the week
   * @returns the number whith which to increase the counter by
   */
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

  setPhych() {
    const st = this.specificHoursForm.get('startTime');
    const et = this.specificHoursForm.get('endTime');

    const sh = parseInt(st?.value.substring(0,2));
    const sm = parseInt(st?.value.substring(3,5));
    const eh = parseInt(et?.value.substring(0,2));
    const em = parseInt(et?.value.substring(3,5));

    if(parseInt(this.typeForm.get("type")?.value) === this.psychiatrist) {
      this.nursePhysioBadTime = false;
      if ((sh < 6)  || (sh < 6 && sm == 0) || (eh > 20) || (eh >= 20 && em != 0)) {
        this.psychBadTime = true;
      }
      else {
        this.psychBadTime = false;
      }
    } else {
      this.psychBadTime = false;
      if ((sh < 6)  || (sh < 6 && sm == 0) || (eh > 18) || (eh >= 18 && em != 0)) {
        this.nursePhysioBadTime = true;
      }
      else {
        this.nursePhysioBadTime = false;
      }
    }
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