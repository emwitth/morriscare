import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SnackbarModule {

  ex: string = "X";
  okay: string = "Okay";
  genErrMsg: string = "An Error Occured, please try again";
  genSucMsg: string = "Success!";

  constructor(private _snackBar: MatSnackBar){}

  openSnackbarSuccessCust(message: string) {
    this.openSnackBar(message, this.okay);
  }

  openSnackbarSuccess() {
    this.openSnackBar(this.genSucMsg, this.okay);
  }

  openSnackbarErrorCust(message: string) {
    this.openSnackBar(message, this.okay);
  }

  openSnackbarError() {
    this.openSnackBar(this.genErrMsg, this.okay);
  }

  /**
   * Opens a snackbar to indicate something (yummy)
   * 
   * @param message the message to display
   * @param action the action to display
   */
     openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        panelClass: 'mat-snackbar-colors'
      });
    }
 }
