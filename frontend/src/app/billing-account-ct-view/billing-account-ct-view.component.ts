import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { BillingAccount, Detail, Record } from '../interfaces/BillingAccount';
import { ActivatedRoute } from '@angular/router';

export interface SingleRecord {
  hcpName: string,
  workDate: string,
  startTime: string,
  endTime: string,
  amount: number
}
@Component({
  selector: 'app-billing-account-ct-view',
  templateUrl: './billing-account-ct-view.component.html',
  styleUrls: ['./billing-account-ct-view.component.css']
})
export class BillingAccountCtViewComponent implements OnInit {

  info: BillingAccount = {
    billingAccount: -1,
    requestID: -1,
    detail: [],
    total: 0.00,
    paidTotal: 0.00,
    unPaidTotal: 0.00,
    patientName: "Unavailable"
  }

  records: Array<SingleRecord> = [];

  constructor(private http: HttpClient, private snackbar: SnackbarModule,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get<any>("api/billing/" + this.route.snapshot.params?.id + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch billing information: status " + result.status);
      } else if(result.status == 200) {
        this.info = result.body;
        this.info.detail.forEach((element : Detail) => {
          element.records.forEach((record: Record) => {
            this.records.push({
              hcpName: element.hcpName,
              workDate: record.workDate,
              startTime: record.startTime,
              endTime: record.endTime,
              amount: record.amount
            });
          });
        });
      }
      }, err => {
        this.snackbar.openSnackbarErrorCust("Failed to fetch billing information: " + err.error.error);
      });
  }

}
