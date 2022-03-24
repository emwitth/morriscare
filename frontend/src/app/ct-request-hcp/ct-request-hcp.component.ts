import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DAYS } from '../global-variables';


@Component({
  selector: 'app-ct-request-hcp',
  templateUrl: './ct-request-hcp.component.html',
  styleUrls: ['./ct-request-hcp.component.css']
})
export class CtRequestHcpComponent implements OnInit {
  @Input('enabled') enabled!: Array<boolean>;

  daysForm: FormGroup;

  // get accesssors for days enum
  get SUNDAY() { return DAYS.sunday; };
  get MONDAY() { return DAYS.monday; };
  get TUESDAY() { return DAYS.tuesday; };
  get WEDNESDAY() { return DAYS.wednesday; };
  get THURSDAY() { return DAYS.thursday; };
  get FRIDAY() { return DAYS.friday; };
  get SATURDAY() { return DAYS.saturday; };

  constructor(private fb: FormBuilder) {
    this.daysForm = this.fb.group({
      monday:[],
      tuesday:[],
      wednesday:[],
      thursday:[],
      friday:[],
      saturday:[],
      sunday:[],
    });
   }

  ngOnInit(): void {
  }

}
