import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(private router: Router,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
  }

  // close dialogue with false state
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  logout () {
    sessionStorage.clear()
    this.router.navigate([""]);
    this.dialogRef.close({ event: 'close', data: true });
  }

}
