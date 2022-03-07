import { ConfirmationDialogComponent } from './../dialog-components/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Applicant } from '../interfaces/Applicant';
import { Roles } from '../global-variables';
import { trigger, style, animate, transition } from '@angular/animations';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


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
    'bottom-animation', 
    [
      transition(
        ':enter', 
        [
          style({ height: 0, opacity: 0 }),
          animate('1s ease-out', 
                  style({ height: 260, opacity: 1 }))
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
  isAppliedTo: boolean = false;
  userType: string = '';
  id: string = "";

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  open(index: number) {
    var button = document.getElementById('button' + index);
    if(!this.isOpen[index])
    {
      if(button != null) {button.className = "exit-button open"}
      this.isOpen[index] = true;
      for(var i = 0; i < this.isClosed.length; i++) {
        if(index != i){
          this.isClosed[i] = true;
        }
      }
    }
    else {
      if(button != null) {button.className = "exit-button"}
      for(var i = 0; i < this.isOpen.length; i++) {
        this.isOpen[i] = false;
      }
      for(var i = 0; i < this.isClosed.length; i++) {
        this.isClosed[i] = false;
      }
    }
  }

  constructor(private snackbar: SnackbarModule, private http: HttpClient,
    public format: FormattingModule, private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.id;
    console.log("IDHERE", this.id);
    this.http.get<any>("api/applicants/" + this.id + "/", { observe: "response" }).subscribe(result => {
      // console.log(result);
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch applicants for job");
      } else if(result.status == 200) {
        result.body.forEach((element: Applicant) => {
          this.applicants.push(element);
          this.isOpen.push(false);
          this.isClosed.push(false);
        });
        if(this.applicants.length > 0) {
          this.isAppliedTo = true;
        }
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch applicants for job");
    });

    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

  reject(first: string, last: string, id: number) {
    const myCompDialog = this.dialog.open(ConfirmationDialogComponent, { data: {
      title: "Reject " + first + " " + last, 
      details:[
        "Are you sure you would like to reject " + first + " " + last + "?",
        "This will result in their application being deleted."
      ]
    } });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
      if(res.data == true) {
        this.http.get<any>("api/deny/" + id + "/", { observe: "response" }).subscribe(result => {
          this.snackbar.openSnackbarError();
          if (result.status != 200) {
          } else if(result.status == 200) {
            console.log(result.body);
          }
        }, err => {
          this.snackbar.openSnackbarErrorCust(err.error.error);
        });
      }
    });
  }

  approve(first: string, last: string, id: number) {
    const myCompDialog = this.dialog.open(ConfirmationDialogComponent, { data: {
      title: "Approve " + first + " " + last, 
      details:[
        "Are you sure you would like to reject " + first + " " + last + "?",
        "This will result in account being created."
      ]
    } });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed
      if(res.data == true) {
        this.http.get<any>("api/approve/" + id + "/", { observe: "response" }).subscribe(result => {
          console.log("RESULT:",result);
          this.snackbar.openSnackbarError();
          if (result.status != 200) {
          } else if(result.status == 200) {
            console.log(result.body);
          }
        }, err => {
          this.snackbar.openSnackbarErrorCust(err.error.error);
        });
      }
    });
  }
}
