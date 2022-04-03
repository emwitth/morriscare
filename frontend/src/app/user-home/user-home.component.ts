import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from '../dialog-components/logout-dialog/logout-dialog.component';
import { Roles } from '../global-variables';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  test = false;

  // titles and links for the sidebar links
  adminFunctions = [
    {title: "Manage Staff", link:"manage-staff"},
    {title: "Manage Care Takers", link:"manage-care-taker"},
    {title: "Manage Applications", link:"applications"},
    {title: "Manage HCPs", link:"manage-hcp"},
    {title: "Manage Requests", link:"manage-ct-request"},
  ];

  smFunctions = [
    {title: "Manage Care Takers", link:"manage-care-taker"},
    {title: "Manage Applications", link:"applications"},
    {title: "Manage HCPs", link:"manage-hcp"},
    {title: "Manage Requests", link:"manage-ct-request"},
  ];

  ctFunctions = [
    {title: "Submit a Request", link:"request-care"},
    {title: "View Requests", link:"request-view"},
  ];

  hcpFunctions = [
    {title: "Home", link:"home"}
  ];


  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    if(sessionStorage?.firstTime) {
      this.sidenav.close();
    }
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
}
