import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ct-request',
  templateUrl: './ct-request.component.html',
  styleUrls: ['./ct-request.component.css']
})
export class CtRequestComponent implements OnInit {

  form: FormGroup;

  today: Date = new Date();

  numberOfDays:number = 10;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

}
