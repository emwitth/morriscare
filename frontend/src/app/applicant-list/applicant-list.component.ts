import { Component, OnInit } from '@angular/core';
import { Applicant } from '../interfaces/Applicant';
import { Roles } from '../global-variables';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
  animations: [
    trigger(
      'openClose', 
      [
        transition(
          ':enter', 
          [
            style({ height:0, opacity: 0 }),
            animate('1s ease-out', 
                    style({ height: 140, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('1s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'exit-button', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('1s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('1s ease-in', 
                    style({ right: "20px", opacity: 0 }))
          ]
        )
      ]
    ),
  trigger(
    'bottom-animation', 
    [
      transition(
        ':enter', 
        [
          style({ height: 0, opacity: 0 }),
          animate('1s ease-out', 
                  style({ height: 320, opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ opacity: 1 }),
          animate('1s ease-in', 
                  style({ height: 0, opacity: 0 }))
        ]
      )
    ]
  )
]
})
export class ApplicantListComponent implements OnInit {

  applicants: Array<Applicant> = new Array<Applicant>();
  isOpen: Array<boolean> = new Array<boolean>();
  isClosed: Array<boolean> = new Array<boolean>();

  open(index: number) {
    this.isOpen[index] = true;
    console.log(this.isOpen);
    for(var i = 0; i < this.isOpen.length; i++) {
      if(index != i){
        this.isClosed[i] = true;
      }
    }
    console.log("isClosed",this.isClosed);
  }

  close() {
    for(var i = 0; i < this.isOpen.length; i++) {
        this.isOpen[i] = false;
    }
    console.log(this.isOpen);
    for(var i = 0; i < this.isOpen.length; i++) {
      this.isClosed[i] = false;
    }
    console.log("isClosed",this.isClosed);
  }


  userType: string = '';

  constructor() { }

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
      id: 10
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
      id: 11
    });

    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }

    this.applicants.forEach(element => {
      this.isOpen.push(false);
      this.isClosed.push(false);
    });
  }

}
