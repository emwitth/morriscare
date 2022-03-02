import { Application } from './../interfaces/application';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Array<Application> = new Array<Application>();
  type: string = "";

  constructor(private route: ActivatedRoute, private snackbar: SnackbarModule,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params?.type;

    // this.http.get<any>("api/applications?type=" + this.type.charAt(0), { observe: "response" }).subscribe(result => {
    //   if (result.status != 200) {
    //     this.snackbar.openSnackbarErrorCust("Failed to fetch job postings for " + this.type);
    //   } else if(result.status == 200) {
    //     result.body.forEach((element: Application) => {
    //       this.jobs.push(element);
    //     });
    //   }
    // }, err => {
    //   this.snackbar.openSnackbarErrorCust("Failed to fetch job postings for " + this.type);
    // });
  }

}
