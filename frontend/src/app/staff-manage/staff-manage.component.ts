import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog,} from '@angular/material/dialog';
import { StaffMember } from '../interfaces/StaffMember';
import { AddSmDialogComponent } from '../dialog-components/add-sm-dialog/add-sm-dialog.component';
@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css']
})
export class StaffManageComponent implements OnInit {
  staffMembers: Array<StaffMember> = new Array<StaffMember>();

  title = 'angular-material-dialog-app';

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  myFooList = ['Some Item', 'Item Second', 'Other In Row', 'What to write', 'Blah To Do']

  constructor(public dialog: MatDialog) { }

  openCompDialog() {
    const myCompDialog = this.dialog.open(AddSmDialogComponent, { data: this.myFooList });
    myCompDialog.afterOpened().subscribe((res) => {
      // Trigger After Dialog Opened 
      console.log('After Opened', { res });
    });
    myCompDialog.beforeClosed().subscribe((res) => {
      // Trigger Before Dialog Closed 
      console.log('Before Closed', { res });
    });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
      console.log('After Closed', { res });
    });
  }

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
