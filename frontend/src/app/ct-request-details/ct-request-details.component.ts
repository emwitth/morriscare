import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { ActivatedRoute } from '@angular/router';
import { CTRequest, Requirements } from '../interfaces/CTRequest';

@Component({
  selector: 'app-ct-request-details',
  templateUrl: './ct-request-details.component.html',
  styleUrls: ['./ct-request-details.component.css']
})
export class CtRequestDetailsComponent implements OnInit {
  request!: CTRequest;
  id = this.route.snapshot.params?.id;

  constructor( private http: HttpClient, private snackbar: SnackbarModule, 
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // retrieve a single request
    this.http.get<any>("api/request/" + this.id + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch requests: status " + result.status);
      } else if(result.status == 200) {
        this.request = result.body;
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch request: " + err.error.error);
    });
  }

}
