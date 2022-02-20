import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog,} from '@angular/material/dialog';
import { LoginDialogComponent } from './dialog-components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  test = false;

  constructor(public dialog: MatDialog, private router: Router) { }

  openLoginDialog() {
    const myCompDialog = this.dialog.open(LoginDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      // console.log('res', {res});
      if(res.data == true) {
        this.router.navigate(['/home']);
        console.log('Logged In!');
      }
      else
      {
        console.log('Canceled!')
      }
    });
  }

  getName() {
    return sessionStorage.getItem('name')?.toLocaleUpperCase();
  }

  checkLoggedIn() {
    if(sessionStorage?.getItem("login") != null) {
      if(sessionStorage?.getItem("login")) {
        return true;
      } 
      return false;
    }
    return false;
  }
}
