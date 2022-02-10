import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  test = false;

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
