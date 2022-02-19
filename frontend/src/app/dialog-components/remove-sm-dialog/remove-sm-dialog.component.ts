import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-sm-dialog',
  templateUrl: './remove-sm-dialog.component.html',
  styleUrls: ['./remove-sm-dialog.component.css']
})
export class RemoveSmDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(
    public dialogRef: MatDialogRef<RemoveSmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) { }

  ngOnInit(): void {
  }

  removeStaffMember() {
    console.log('removed ' + this.mydata?.firstName + ' ' + this.mydata?.lastName);
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

}
