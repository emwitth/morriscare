import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostingDialogComponent } from '../dialog-components/add-posting-dialog/add-posting-dialog.component';
import { Application } from './../interfaces/application';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HCP_LABELS } from '../global-variables';

@Component({
  selector: 'app-application-manage',
  templateUrl: './application-manage.component.html',
  styleUrls: ['./application-manage.component.css']
})
export class ApplicationManageComponent implements OnInit {
  // a list of all the applications
  applications: Array<Application> = new Array<Application>();

  get hcpLabels() {return HCP_LABELS};

  constructor(public dialog: MatDialog, private http: HttpClient, private snackbar: SnackbarModule) { }

  ngOnInit(): void {
    // retrieve all the pending applications (job postings)
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

  /**
   * opens dialog for creating a new applications
   */
  openAddApplicationDialog() {
    const myCompDialog = this.dialog.open(AddPostingDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      // watch dialog for result
      if(res.data == true) {
        // if dialog returns true, reload page to reveal new application in list
        window.location.reload();
      }
    });
  }

}
