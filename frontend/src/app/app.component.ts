import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './dialog-components/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './dialog-components/logout-dialog/logout-dialog.component';
import { Roles } from './global-variables';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'website';
  test = false;

  // titles and links for the sidebar links
  adminFunctions = [
    {title: "Manage Staff", link:"admin/manage-staff"},
    {title: "Manage Care Takers", link:"admin/manage-care-taker"},
  ];

  smFunctions = [
    {title: "Manage Care Takers", link:"manage-care-taker"},
  ];

  ctFunctions = [
    {title: "Home", link:"home"}
  ];

  hcpFunctions = [
    {title: "Home", link:"home"}
  ];

  patientFunctions = [
    {title: "Home", link:"home"}
  ];

  constructor(public dialog: MatDialog, private router: Router) {}

  openLoginDialog() {
    const myCompDialog = this.dialog.open(LoginDialogComponent, { data: '' });
    myCompDialog.afterClosed().subscribe((res) => {
      this.sidenav.open();
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

  openLogoutDialog() {
    const myCompDialog = this.dialog.open(LogoutDialogComponent, {data: ''});
    myCompDialog.afterClosed().subscribe((res) => {
      if(res.data == true) {
        this.sidenav.close();
        console.log('Logged Out!');
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

  checkFirstTime() {
    if(sessionStorage?.getItem("firstTime") != null) {
      if(sessionStorage?.getItem("firstTime")) {
        return true;
      } 
      return false;
    }
    return false;
  }

  checkRole(role: string) {
    return sessionStorage?.getItem('role') == role;
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

  getPatient() {
    return Roles.patient;
  }
}
