import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Roles } from '../global-variables';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialog-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  // the type of user that is viewing this page
  userType: string = "";

  // the information associated with this application
  // (passed when navigating from manage applications)
  qualifications: string = "unavailable";
  education: string = "unavailable";
  type: string = "unavailable";
  experience: string = "unavailable";

  // the id of the application
  id: number = 1;

  // this stuff is for the confirmation dialog
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;
  

  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private snackbar: SnackbarModule, private router: Router, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // set id to application id
    this.id = this.route.snapshot.params?.id;

    // get information passed on navigation
    this.qualifications = history.state.data.qual;
    this.education = history.state.data.ed;
    this.experience = history.state.data.exp;
    this.type = (history.state.data.type == 'p' ? 'Physiotherapist' : 'Nurse');

    // set role of current user for correct navigation back to /role/applications
    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

  /**
   * removes an appliation
   */
  remove() {
    // dialog asks for confirmation
    const myCompDialog = this.dialog.open(ConfirmationDialogComponent, { data: {
      title: "Remove Application", 
      details:[
        "Are you sure you would like to remove the application?"
      ]
    } });
       // watch result of dialog
       myCompDialog.afterClosed().subscribe((res) => {
        if(res.data == true) {
          // if dialog closes with true, delete application
          this.http.delete<any>("api/application/" + this.id + "/", { observe: "response" }).subscribe(result => {
            if (result.status != 200) {
              this.snackbar.openSnackbarError();
            } else if(result.status == 200) {
              // if application successfully deleted, navigate to the applications manage page
              this.router.navigate(["/" + this.userType + "/applications"]);
              this.snackbar.openSnackbarSuccessCust("Application " + this.id + " successfully deleted!");
            }
          }, err => {
            this.snackbar.openSnackbarErrorCust(err.error.error);
          });
        }
      });
    }
}
