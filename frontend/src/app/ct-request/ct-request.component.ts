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
  genderForm: FormGroup;
  ageForm: FormGroup;

  today: Date = new Date();

  numberOfDays:number = 10;

  wantsGender: boolean = false;
  wantsAge: boolean = false;
  isFlexibleHours: boolean = false;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.typeForm = this.fb.group({
      type: ['', Validators.required]
    });
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.specificHoursForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    }, {validators: startBeforeEnd});
    this.genderForm = this.fb.group({
      gender: ['', Validators.required]
    });
    this.flexibleHoursForm = this.fb.group({
      hours: ['', Validators.required]
    });
    this.ageForm = this.fb.group({
      min: ['', Validators.required],
      max: ['', Validators.required]
    }, {validators: minLTmax});
  }

  ngOnInit(): void {
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