import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  title: string = "Approve";
  details: Array<string> = [
    "Are you sure you would like to complete this function?"
  ];
  confirm: string = "Okay";
  cancel: string = "Cancel";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  ngOnInit(): void {
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

  closeDialog(result: boolean) { this.dialogRef.close({ event: 'close', data: result }); }

}
