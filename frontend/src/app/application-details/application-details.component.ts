import { Component, OnInit } from '@angular/core';
import { Roles } from '../global-variables';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  userType: string = "";
  qualifications: string = "";
  education: string = "";
  APPID: number = 1;

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    console.log(history.state.data);
    console.log("details", this.route.snapshot.params);
    this.APPID = this.route.snapshot.params?.appId;

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
