import { Component, OnInit } from '@angular/core';
import { UnappCareTaker, CareTaker } from '../interfaces/CareTaker';
import { Roles } from 'src/app/global-variables';
import { MatDialog } from '@angular/material/dialog';
import { ApiModule } from '../modules/api/api.module';
import { ApproveCtDialogComponent } from '../dialog-components/approve-ct-dialog/approve-ct-dialog.component';
import { RemoveSmDialogComponent } from '../dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
@Component({
  selector: 'app-ct-manage',
  templateUrl: './ct-manage.component.html',
  styleUrls: ['./ct-manage.component.css']
})
export class CtManageComponent implements OnInit {
  unapprovedCareTakers: Array<UnappCareTaker> = new Array<UnappCareTaker>();
  approvedCareTakers: Array<CareTaker> = new Array<CareTaker>();

  constructor(private api: ApiModule, private dialog: MatDialog,
    private snackbar: SnackbarModule, private http: HttpClient) { }

  ngOnInit(): void {
    // get care takers from back end
    this.unapprovedCareTakers = this.api.getUnapprovedCTs();
    console.log(this.unapprovedCareTakers);
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch Approved CTs: " + result);
      } else if(result.status == 200) {
        result.body.forEach((element: any) => {
          if(element.role.type == Roles.ct) {
           this.approvedCareTakers.push(element);
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch Approved CTs: " + (err.error.error? err.error.error : err.message));
    });
    console.log(this.approvedCareTakers);
  }

  openApproveDialog(first: string, last: string, id: string) {
    const myCompDialog = this.dialog.open(ApproveCtDialogComponent, { data: {firstName: first, lastName:last, id: id} });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
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

}
