import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-remove-sm-dialog',
  templateUrl: './remove-sm-dialog.component.html',
  styleUrls: ['./remove-sm-dialog.component.css']
})
export class RemoveSmDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<RemoveSmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) { }

  ngOnInit(): void {
  }

  removeStaffMember() {
    this.http.delete<any>("api/user/" + this.mydata?.id + "/", { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        //
      } else if(result.status == 200) {
        console.log(result.body);
      }
    }, err => {
      //
    });

    console.log('removed ' + this.mydata?.firstName + ' ' + this.mydata?.lastName, this.mydata?.id);
    this.dialogRef.close({ event: 'close', data: true });
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

}
