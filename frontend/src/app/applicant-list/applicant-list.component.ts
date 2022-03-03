import { Component, OnInit } from '@angular/core';
import { Applicant } from '../interfaces/Applicant';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("applicant-list component");
  }

}
