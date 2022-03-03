import { Component, OnInit } from '@angular/core';
import { Roles } from '../global-variables';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  userType: string = "";
  qualifications: string = "";
  education: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log(history.state.data);

    this.qualifications = history.state.data.qualifications;
    this.education = history.state.data.education;

    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

}
