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
  postings: Array<Application> = new Array<Application>();
  type: string = "";

  constructor(private route: ActivatedRoute, private snackbar: SnackbarModule,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params?.type;

    this.postings.push({
      type: "p",
      qualifications: "7 years of experience",
      education: "bachelors degree in nursing",
      id: 1
    });
    this.postings.push({
      type: "p",
      qualifications: "18 years of experience",
      education: "masters degree in nursing",
      id: 2
    });
    this.postings.push({
      type: "p",
      qualifications: "5-10 years of experience",
      education: "bachelors degree in nursing",
      id: 4
    });

    // this.http.get<any>("api/applications?type=" + this.type.charAt(0), { observe: "response" }).subscribe(result => {
    //   if (result.status != 200) {
    //     this.snackbar.openSnackbarErrorCust("Failed to fetch job postings for " + this.type);
    //   } else if(result.status == 200) {
    //     result.body.forEach((element: Application) => {
    //       this.postings.push(element);
    //     });
    //   }
    // }, err => {
    //   this.snackbar.openSnackbarErrorCust("Failed to fetch job postings for " + this.type);
    // });
  }

}
