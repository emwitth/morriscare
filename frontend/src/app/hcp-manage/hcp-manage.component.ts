import { HCP } from './../interfaces/HCP';
import { Roles } from 'src/app/global-variables';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveSmDialogComponent } from '../dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { FormattingModule } from '../modules/formatting/formatting.module';

@Component({
  selector: 'app-hcp-manage',
  templateUrl: './hcp-manage.component.html',
  styleUrls: ['./hcp-manage.component.css']
})
export class HcpManageComponent implements OnInit {
  hcps: Array<HCP> = new Array<HCP>();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(public dialog: MatDialog, public format: FormattingModule,
    private snackbar: SnackbarModule, private http: HttpClient) { }

  /**
   * Opens dialog to remove a user from the system
   * 
   * @param first the firstname of the account
   * @param last the lastname of the account
   * @param id the id of the account
   */
  openRemoveDialog(first: string, last: string, id: string) {
    const myCompDialog = this.dialog.open(RemoveSmDialogComponent, { data: {firstName: first, lastName:last, id: id} });
    myCompDialog.afterClosed().subscribe((res) => {
      if(res.data == true) {
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
    // get hcp from back end
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch HCPs: " + result);
      } else if(result.status == 200) {
        result.body.forEach((element: any) => {
          if(element.role.type == Roles.hcp) {
           this.hcps.push(element);
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch HCPs: " + (err.error.error? err.error.error : err.message));
    });
  }

}
