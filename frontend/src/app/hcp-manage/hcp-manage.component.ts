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
    this.hcps = this.api.getListOfUsers(Roles.hcp);
    console.log(this.hcps);
  }

}
