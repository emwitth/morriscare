import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ct-request',
  templateUrl: './ct-request.component.html',
  styleUrls: ['./ct-request.component.css']
})
export class CtRequestComponent implements OnInit {

  patientForm: FormGroup;
  defaultServiceForm: FormGroup;
  genderForm: FormGroup;
  flexibleHoursForm: FormGroup;
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
    this.defaultServiceForm = this.fb.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
    this.genderForm = this.fb.group({
      gender: ['', Validators.required]
    });
    this.flexibleHoursForm = this.fb.group({
      hours: ['', Validators.required]
    });
    this.ageForm = this.fb.group({
      min: ['', Validators.required],
      max: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
