import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostingDialogComponent } from '../dialog-components/add-posting-dialog/add-posting-dialog.component';

@Component({
  selector: 'app-application-manage',
  templateUrl: './application-manage.component.html',
  styleUrls: ['./application-manage.component.css']
})
export class ApplicationManageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddApplicationDialog() {
    const myCompDialog = this.dialog.open(AddPostingDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
      console.log('After Closed', { res });
    });
  }

}
