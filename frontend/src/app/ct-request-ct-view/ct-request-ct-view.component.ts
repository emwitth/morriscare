import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from './../modules/snackbar/snackbar.module';
import { CTRequest } from '../interfaces/CTRequest';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { HCP_LABELS, HCP_TYPE } from '../global-variables';

@Component({
  selector: 'app-ct-request-ct-view',
  templateUrl: './ct-request-ct-view.component.html',
  styleUrls: ['./ct-request-ct-view.component.css']
})
export class CtRequestCtViewComponent implements OnInit {

  requests: Array<CTRequest> = [];
  pendingRequests: Array<CTRequest> = [];
  terminatedRequests: Array<CTRequest> = [];

  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};
  get hcpLabels() {return HCP_LABELS};

  constructor(private http: HttpClient, private snackbar: SnackbarModule,
    public format: FormattingModule) { }

  ngOnInit(): void {
       // retrieve all the requests
       this.http.get<any>("api/requests/", { observe: "response" }).subscribe(result => {
        if (result.status != 200) {
          this.snackbar.openSnackbarErrorCust("Failed to fetch requests: status " + result.status);
        } else if(result.status == 200) {
          result.body.forEach((element: CTRequest) => {
            if(element.userID == parseInt(sessionStorage.getItem("id") + "")) {
              if(element.distribution.assigned.length == 0) {
                this.pendingRequests.push(element);
              }
              else if(element.deleted == true) {
                this.terminatedRequests.push(element);
              }
              else {
                this.requests.push(element);
              }
            }
          });
        }
      }, err => {
        this.snackbar.openSnackbarErrorCust("Failed to fetch requests: " + err.error.error);
      });
  }

}
