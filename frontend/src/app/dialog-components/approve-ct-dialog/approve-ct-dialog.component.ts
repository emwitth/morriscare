import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from 'src/app/modules/snackbar/snackbar.module';

@Component({
  selector: 'app-approve-ct-dialog',
  templateUrl: './approve-ct-dialog.component.html',
  styleUrls: ['./approve-ct-dialog.component.css']
})
export class ApproveCtDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor( 
    private http: HttpClient,
    public dialogRef: MatDialogRef<ApproveCtDialogComponent>,
    private snackbar: SnackbarModule,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  ngOnInit(): void {
  }

  approveCareTaker(id: string) {
    this.http.post<any>("api/caretaker_enroll/" + id + "/",{}, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarError();
      } else {
        this.closeDialog(true);
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust(err.error.error);
    });
  }

  closeDialog(result: boolean) { this.dialogRef.close({ event: 'close', data: result }); }

}
