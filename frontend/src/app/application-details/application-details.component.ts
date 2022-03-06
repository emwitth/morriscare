import { Component, OnInit } from '@angular/core';
import { Roles } from '../global-variables';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  userType: string = "";
  qualifications: string = "unavailable";
  education: string = "unavailable";
  type: string = "unavailable";
  experience: string = "unavailable";
  id: number = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private snackbar: SnackbarModule, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params?.id;

    this.qualifications = history.state.data.qual;
    this.education = history.state.data.ed;
    this.experience = history.state.data.exp;
    this.type = (history.state.data.type == 'p' ? 'Physiotherapist' : 'Nurse');

    if(Roles.admin == sessionStorage.getItem("role")) {
      this.userType = "admin";
    }
    else if(Roles.sm == sessionStorage.getItem("role")) {
      this.userType = "staff";
    }
  }

  remove() {
    this.http.delete<any>("api/application/" + this.id + "/", { observe: "response" }).subscribe(result => {
      console.log(result);
      if (result.status != 200) {
        this.snackbar.openSnackbarError();
      } else if(result.status == 200) {
        console.log(result.body);
        this.router.navigate(["/" + this.userType + "/applications"]);
        this.snackbar.openSnackbarSuccessCust("Application " + this.id + " successfully deleted!");
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust(err.error.error);
    });
  }

}
