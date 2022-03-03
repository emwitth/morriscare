import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCtDialogComponent as RegisterCtDialogComponent } from '../dialog-components/register-ct-dialog/register-ct-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openRegisterDialog() {
    const myCompDialog = this.dialog.open(RegisterCtDialogComponent, { data: '' });
    myCompDialog.afterOpened().subscribe((res) => {
      // Trigger After Dialog Opened 
      console.log('After Opened', { res });
    });
    myCompDialog.beforeClosed().subscribe((res) => {
      // Trigger Before Dialog Closed 
      console.log('Before Closed', { res });
    });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed 
      console.log('After Closed', { res });
    });
  }


  ngOnInit(): void {
  }

}
