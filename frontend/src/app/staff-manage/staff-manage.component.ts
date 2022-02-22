import { StaffMember } from './../interfaces/StaffMember';
import { Roles } from 'src/app/global-variables';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSmDialogComponent } from '../dialog-components/add-sm-dialog/add-sm-dialog.component';
import { RemoveSmDialogComponent } from '../dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { ApiModule } from '../modules/api/api.module';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css']
})
export class StaffManageComponent implements OnInit {
  staffMembers: Array<StaffMember> = new Array<StaffMember>();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(public dialog: MatDialog, private api: ApiModule) { }

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
    this.staffMembers = this.api.getListOfUsers(Roles.sm);
    console.log(this.staffMembers);
  }

}
