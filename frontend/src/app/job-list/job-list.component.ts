import { Application } from './../interfaces/application';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';
import { HCP_LABELS } from '../global-variables';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  postings: Array<Application> = new Array<Application>();
  type: string = "";

  constructor(private route: ActivatedRoute, private snackbar: SnackbarModule,
    private http: HttpClient) { }

  ngOnInit(): void {
    // get type to query for correct job postings
    this.type = this.route.snapshot.params?.type;
    console.log(this.type);

    // get job postings from backend
    this.http.get<any>("api/applications/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch job postings for " + this.type);
      } else if(result.status == 200) {
        result.body.forEach((element: Application) => {
          if(element.typeHS == (this.type == HCP_LABELS.nurse.label ? HCP_LABELS.nurse.type : (this.type == HCP_LABELS.physiotherapist.label ? HCP_LABELS.physiotherapist.type : HCP_LABELS.psychiatrist.type))) {
            this.postings.push(element);
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch job postings for " + this.type + ": " + err.error.error);
    });
  }

}
