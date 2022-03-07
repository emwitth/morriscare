import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
/**
 * This is a generic dialog for any confrimation needed for an action.
 * It has generic values for its information, but any of them can be
 * overridden by passing in an object containing new information to display.
 */
export class ConfirmationDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  // the title and details about the action being performed
  title: string = "Approve";
  details: Array<string> = [
    "Are you sure you would like to complete this function?"
  ];
  // the names of the confirmation or cancel buttons
  confirm: string = "Okay";
  cancel: string = "Cancel";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  ngOnInit(): void {
    // override default value for each part of the dialog if one provided,
    // otherwise keep the default display for that piece of the dialog
    if(this.mydata?.title) {
      this.title = this.mydata.title;
    }
    if(this.mydata?.details) {
      this.details = this.mydata.details;
    }
    if(this.mydata?.confirm) {
      this.confirm = this.mydata.confirm;
    }
    if(this.mydata?.cancel) {
      this.cancel = this.mydata.cancel;
    }
  }

  /**
   * Close dialog with boolean indicating confirmation or non-confirmation
   * 
   * @param result the boolean result of the dialog (true: confirm, false: cancel)
   */
  closeDialog(result: boolean) { this.dialogRef.close({ event: 'close', data: result }); }

}
