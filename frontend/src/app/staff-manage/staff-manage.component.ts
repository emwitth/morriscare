import { Component, OnInit } from '@angular/core';
import { StaffMember } from '../interfaces/StaffMember';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css']
})
export class StaffManageComponent implements OnInit {
  staffMembers: Array<StaffMember> = new Array<StaffMember>();

  constructor() { }

  ngOnInit(): void {
    //get staff member from back end

    var sm1  = {
      firstName: "jim",
      lastName: "davis",
      postalAddress: "123 456 ave",
      email: "jim@davis.net",
      phoneNumber: "(123) 456-7890"
    };
    var sm2  = {
      firstName: "ethan",
      lastName: "manhart",
      postalAddress: "123 456 ave",
      email: "ethan@manhart.net",
      phoneNumber: "(123) 456-7890"
    };
    var sm3  = {
      firstName: "evan",
      lastName: "witthun",
      postalAddress: "123 456 ave",
      email: "evan@witthun.net",
      phoneNumber: "(123) 456-7890"
    };
    var sm4  = {
      firstName: "carlie",
      lastName: "close",
      postalAddress: "123 456 ave",
      email: "carlie@close.net",
      phoneNumber: "(123) 456-7890"
    };
    this.staffMembers.push(sm1);
    this.staffMembers.push(sm2);
    this.staffMembers.push(sm3);
    this.staffMembers.push(sm4);
  }

}
