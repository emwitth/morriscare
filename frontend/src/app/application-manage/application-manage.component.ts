import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostingDialogComponent } from '../dialog-components/add-posting-dialog/add-posting-dialog.component';
import { Application } from './../interfaces/application';

@Component({
  selector: 'app-application-manage',
  templateUrl: './application-manage.component.html',
  styleUrls: ['./application-manage.component.css']
})
export class ApplicationManageComponent implements OnInit {
  applications: Array<Application> = new Array<Application>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.applications.push({
      type: "n",
      qualifications: "7 years of experience",
      education: "bachelors degree in nursing",
      id: 1
    });
    this.applications.push({
      type: "p",
      qualifications: "18 years of experience",
      education: "masters degree in nursing",
      id: 2
    });
    this.applications.push({
      type: "n",
      qualifications: "5-10 years of experience",
      education: "bachelors degree in nursing",
      id: 4
    });
  }

  openAddApplicationDialog() {
    const myCompDialog = this.dialog.open(AddPostingDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
      console.log('After Closed', { res });
    });
  }

}
