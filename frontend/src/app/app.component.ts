import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './dialog-components/login-dialog/login-dialog.component';
import { Roles } from './global-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  test = false;

  // titles and links for the sidebar links
  adminFunctions = [
    {title: "Manage Staff", link:"admin/manage-staff"},
  ];

  smFunctions = [
    {title: "Home", link:"home"}
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
      // console.log('res', {res});
      if(res.data == true) {
        console.log(sessionStorage.getItem("role"));
        console.log(Roles.admin);
        if(this.checkRole(this.getAdmin())) {
          this.router.navigate(['admin/manage-staff']);
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

  checkRole(role: string) {
    return sessionStorage?.getItem('role') == role;
  }

  // functions to get Role values in html
  // ct = 'caretaker',
  //   sm = 'staffmember',
  //   hcp = 'healthcareprovider',
  //   patient = 'patient'
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
