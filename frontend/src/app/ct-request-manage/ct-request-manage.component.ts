import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { CTRequest, Requirements } from '../interfaces/CTRequest';

@Component({
  selector: 'app-ct-request-manage',
  templateUrl: './ct-request-manage.component.html',
  styleUrls: ['./ct-request-manage.component.css']
})
export class CtRequestManageComponent implements OnInit {

  requests: Array<CTRequest> = new Array<CTRequest>();

  constructor(private http: HttpClient, private snackbar: SnackbarModule) { }

  ngOnInit(): void {
    // retrieve all the pending requests
    this.http.get<any>("api/requests/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch requests: status " + result.status);
      } else if(result.status == 200) {
        result.body.forEach((element: CTRequest) => {
          this.requests.push(element);
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch requests: " + err.error.error);
    });
  }

}
