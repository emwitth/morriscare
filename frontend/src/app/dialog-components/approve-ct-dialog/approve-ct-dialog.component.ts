import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approve-ct-dialog',
  templateUrl: './approve-ct-dialog.component.html',
  styleUrls: ['./approve-ct-dialog.component.css']
})
export class ApproveCtDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  isAdded: boolean = false;
  username: string = "";
  password: string = "";

  constructor( 
    private http: HttpClient,
    public dialogRef: MatDialogRef<ApproveCtDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  ngOnInit(): void {
  }

  approveCareTaker(id: string) {
    this.http.post<any>("api/caretaker_enroll/" + id + "/",{}, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("not 200")
      } else {
        console.log("200");
        this.username = result.body.username;
        this.password = result.body.pwd;
      }
    }, err => {
      //
    });
    this.isAdded = true;
  }

  closeDialog(result: boolean) { this.dialogRef.close({ event: 'close', data: result }); }

}
