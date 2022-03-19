import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
      dob: [new Date(), Validators.required],
      location: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
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
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
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