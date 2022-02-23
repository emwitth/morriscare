import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiModule } from 'src/app/modules/api/api.module';
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
    private api: ApiModule,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ApproveCtDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  ngOnInit(): void {
  }

  approveCareTaker(id: string) {
    // var temp = this.api.approveCareTaker(id);
    // console.log(temp);
    this.http.post<any>("api/caretaker_enroll/" + id + "/", { observe: "response" }).subscribe(result => {
      console.log(result.username);
      console.log(result.pwd);
        this.username = result.username;
        this.password = result.pwd;

      // toReturn.username = result?.username;
      // toReturn.pwd = result?.pwd;
      if (result.status != 200) {
        console.log("not 200")
        // toReturn.username = result?.username;
        // toReturn.pwd = result?.pwd;
      } else if(result.status == 200) {
        // toReturn.username = result?.username;
        // toReturn.pwd = result?.pwd;
        console.log(200);
        // return result;
        // var toReturn = {
        //   username: result.body.
        // }
      }
    }, err => {
      //
    });
    this.isAdded = true;
    // this.dialogRef.close({ event: 'close', data: false });
  }

  closeDialog(result: boolean) { this.dialogRef.close({ event: 'close', data: result }); }

}
