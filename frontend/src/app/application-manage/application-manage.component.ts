import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostingDialogComponent } from '../dialog-components/add-posting-dialog/add-posting-dialog.component';
import { Application } from './../interfaces/application';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';

@Component({
  selector: 'app-application-manage',
  templateUrl: './application-manage.component.html',
  styleUrls: ['./application-manage.component.css']
})
export class ApplicationManageComponent implements OnInit {
  applications: Array<Application> = new Array<Application>();

  constructor(public dialog: MatDialog, private http: HttpClient, private snackbar: SnackbarModule) { }

  ngOnInit(): void {
    this.http.get<any>("api/applications/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch applications");
      } else if(result.status == 200) {
        result.body.forEach((element: Application) => {
          this.applications.push(element);
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch applications");
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
