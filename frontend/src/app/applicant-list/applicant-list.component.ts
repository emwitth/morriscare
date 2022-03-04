import { Component, OnInit } from '@angular/core';
import { Applicant } from '../interfaces/Applicant';
import { Roles } from '../global-variables';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {

  applicants: Array<Applicant> = new Array<Applicant>();
  userType: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.applicants.push({
      firstName: "John",
      lastName: "Paul",
      email: "jpail@pope.aol.net",
      sex: "M",
      phoneNumber: "(608) 434-9087",
      address: "The Vatican Somewhere",
      dateOfBirth: "05/05/1990",
      ssn: "432-65-2345",
      yearsOfExperience: "5",
      qualifications: "Education of me is me me me",
      id: 1
    });
    this.applicants.push({
      firstName: "John",
      lastName: "Paul",
      email: "jpail@pope.aol.net",
      sex: "M",
      phoneNumber: "(608) 434-9087",
      address: "The Vatican Somewhere",
      dateOfBirth: "05/05/1990",
      ssn: "432-65-2345",
      yearsOfExperience: "5",
      qualifications: "Education of me is me me me",
      id: 8
    });
    this.applicants.push({
      firstName: "John",
      lastName: "Paul",
      email: "jpail@pope.aol.net",
      sex: "M",
      phoneNumber: "(608) 434-9087",
      address: "The Vatican Somewhere",
      dateOfBirth: "05/05/1990",
      ssn: "432-65-2345",
      yearsOfExperience: "5",
      qualifications: "Education of me is me me me",
      id: 9
    });

    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

}
