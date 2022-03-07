import { HCP } from './../interfaces/HCP';
import { Roles } from 'src/app/global-variables';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveSmDialogComponent } from '../dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { ApiModule } from '../modules/api/api.module';


@Component({
  selector: 'app-hcp-manage',
  templateUrl: './hcp-manage.component.html',
  styleUrls: ['./hcp-manage.component.css']
})
export class HcpManageComponent implements OnInit {
  hcps: Array<HCP> = new Array<HCP>();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(public dialog: MatDialog, private api: ApiModule) { }

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
    this.hcps = this.api.getListOfUsers(Roles.hcp);
  }

}
