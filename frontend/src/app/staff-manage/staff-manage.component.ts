import { StaffMember } from './../interfaces/StaffMember';
import { Roles } from 'src/app/global-variables';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSmDialogComponent } from '../dialog-components/add-sm-dialog/add-sm-dialog.component';
import { RemoveSmDialogComponent } from '../dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';
import { FormattingModule } from '../modules/formatting/formatting.module';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css']
})
export class StaffManageComponent implements OnInit {
  staffMembers: Array<StaffMember> = new Array<StaffMember>();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(public dialog: MatDialog, public format: FormattingModule,
    private snackbar: SnackbarModule, private http: HttpClient) { }

  openAddDialog() {
    const myCompDialog = this.dialog.open(AddSmDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed
      console.log(res.data); 
      if(res.data == true) {
        window.location.reload();
      }
    });
  }

  openRemoveDialog(first: string, last: string, id: string) {
    const myCompDialog = this.dialog.open(RemoveSmDialogComponent, { data: {firstName: first, lastName:last, id: id} });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
      if(res.data == true) {
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
    // get staff member from back end
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch Staff Members: " + result);
      } else if(result.status == 200) {
        result.body.forEach((element: any) => {
          if(element.role == Roles.sm) {
           this.staffMembers.push(element);
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch Staff Members: " + (err.error.error? err.error.error : err.message));
    });
    console.log(this.staffMembers);
  }
}
