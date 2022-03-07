import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialog-components/login-dialog/login-dialog.component';
import { Roles } from '../global-variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {}

  openLoginDialog() {
    const myCompDialog = this.dialog.open(LoginDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      if(res.data == true) {
        console.log(sessionStorage.getItem("role"));
        console.log(Roles.admin);
        if(this.checkRole(this.getAdmin())) {
          this.router.navigate(['admin/manage-staff']);
        }
        else if(this.checkRole(this.getSM())) {
          this.router.navigate(['staff/manage-care-taker']);
        }
        else {
          this.router.navigate(['home']);
        }
        console.log('Logged In!');
      }
      else
      {
        console.log('Canceled!')
      }
    });
  }

  // functions to get Role values in html
  getAdmin() {
    return Roles.admin;
  }
  
  getCT() {
    return Roles.ct;
  }
  
  getSM() {
    return Roles.sm;
  }
  
  getHCP() {
    return Roles.hcp;
  }

  checkRole(role: string) {
    return sessionStorage?.getItem('role') == role;
  }

}
