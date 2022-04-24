import { ConfirmationDialogComponent } from './../dialog-components/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Applicant } from '../interfaces/Applicant';
import { Roles } from '../global-variables';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css'],
})
export class ApplicantListComponent implements OnInit {

  // the array for ngFor
  applicants: Array<Applicant> = new Array<Applicant>();

  // the variables indicating whether a applicant is expanded, shown, or hidden
  isOpen: Array<boolean> = new Array<boolean>(); // indicates which applicant entry is expanded
  isClosed: Array<boolean> = new Array<boolean>(); // indicates that all the other entries are closed
  isRejected: Array<boolean> = new Array<boolean>(); // indicates whether an applicant has been rejected or not

  // indicates whether any applicants have applied to this application
  isAppliedTo: boolean = false;

  // indicates the type of the current user (admin or staff)
  userType: string = '';

  // indicates the application id
  id: string = "";

  // this stuff is for the confirmation dialog
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(private snackbar: SnackbarModule, private http: HttpClient,
    public format: FormattingModule, private route: ActivatedRoute,
    public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    // sets id to the id of the application
    this.id = this.route.snapshot.params?.id;

    // gets list of applicants
    this.http.get<any>("api/applicants/" + this.id + "/", { observe: "response" }).subscribe(result => {
      // console.log(result);
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch applicants for job");
      } else if(result.status == 200) {
        // if list comes back put in array
        result.body.forEach((element: Applicant) => {
          this.applicants.push(element);
          this.isOpen.push(false);
          this.isClosed.push(false);
          this.isRejected.push(false);
        });
        // if list comes back empty, set boolean 
        // so ngIf can display message indicating such
        if(this.applicants.length > 0) {
          this.isAppliedTo = true;
        }
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch applicants for job");
    });

    // for navigating back to /role/application-manage, so right url is used
    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

  /**
  * Toggles between opening an applicant and hideing all other applicants
  * and showing all applicants in collapsed view
  * 
  * @param index the index of which applicant is being expanded
  */
  toggle(index: number) {
    console.log("toggle", index);
    var button = document.getElementById('button' + index);
    if(!this.isOpen[index])
    { // opens one element, hides all others, rotates exit button to <
      if(button != null) {button.className = "exit-button open"}
      this.isOpen[index] = true;
      for(var i = 0; i < this.isClosed.length; i++) {
        if(index != i){
          this.isClosed[i] = true;
        }
      }
    }
    else { // shows all elements, collapses current, rotates exit button to \/
      if(button != null) {button.className = "exit-button"}
      for(var i = 0; i < this.isOpen.length; i++) {
        this.isOpen[i] = false;
      }
      for(var i = 0; i < this.isClosed.length; i++) {
        this.isClosed[i] = false;
      }
    }
    console.log("isClosed",this.isClosed);
    console.log("isOpen",this.isOpen);
  }

  /**
   * Rejects the chosen applicant after a confirmation dialog
   * 
   * @param first the first name of the appliant
   * @param last the last name of the applicant
   * @param id the pID of the applicant
   * @param index the index of the applicant
   */
  reject(first: string, last: string, id: number, index: number) {
    // dialog asks for confirmation
    const myCompDialog = this.dialog.open(ConfirmationDialogComponent, { data: {
      title: "Reject " + first + " " + last, 
      details:[
        "Are you sure you would like to reject " + first + " " + last + "?",
        "This will result in their application being deleted."
      ]
    } });
    // watch result of dialog
    myCompDialog.afterClosed().subscribe((res) => {
      if(res.data == true) {
        // if dialog closes with true, deny the applicant
        this.http.get<any>("api/deny/" + id + "/", { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            this.snackbar.openSnackbarError();
          } else if(result.status == 200) {
            this.isRejected[index] = true;
            this.toggle(index);
          }
        }, err => {
          this.snackbar.openSnackbarErrorCust(err.error.error);
        });
      }
    });
  }

  /**
   * Approves the chosen applicant after a confirmation dialog
   * 
   * @param first the first name of the appliant
   * @param last the last name of the applicant
   * @param id the pID of the applicant
   */
  approve(first: string, last: string, id: number) {
    // dialog asks for confirmation
    const myCompDialog = this.dialog.open(ConfirmationDialogComponent, { data: {
      title: "Approve " + first + " " + last, 
      details:[
        "Are you sure you would like to reject " + first + " " + last + "?",
        "This will result in account being created."
      ]
    } });
    // watch result of dialog
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed
      if(res.data == true) {
        // if dialog closes with true, approve the applicant
        // delete application and all other applicants as job post is filled
        this.snackbar.openSnackbarSuccessCust("Creating account. This may take a second!");
        this.http.get<any>("api/approve/" + id + "/", { observe: "response" }).subscribe(result => {
          console.log("RESULT:",result);
          if (result.status != 200) {
            this.snackbar.openSnackbarError();
          } else if(result.status == 200) {
            console.log(result.body);
            this.router.navigate([this.userType + "/applications"]);
          }
        }, err => {
          this.snackbar.openSnackbarErrorCust(err.error.error);
        });
      }
    });
  }
}
