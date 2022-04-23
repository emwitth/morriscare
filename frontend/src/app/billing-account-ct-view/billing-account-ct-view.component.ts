import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { BillingAccount, Detail, Record } from '../interfaces/BillingAccount';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  form: FormGroup;


  constructor(private http: HttpClient, private snackbar: SnackbarModule,
    private route: ActivatedRoute, private fb: FormBuilder) { 
      this.form = this.fb.group({
        dollars: ['', [Validators.required, Validators.pattern("[0-9]+")]],
        cents: ['', [Validators.required, Validators.pattern("[0-9]{2}")]]
      });
    }

  ngOnInit(): void {
    this.http.get<any>("api/billing/" + this.route.snapshot.params?.id + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch billing information: status " + result.status);
      } else if(result.status == 200) {
        this.info = result.body;
        if(this.info.unPaidTotal == 0) {
          this.form.disable();
        }
        this.info.detail.forEach((element : Detail) => {
          var i = 0;
          element.records.forEach((record: Record) => {
            var name = i == 0 ? element.hcpName : "";
            this.records.push({
              hcpName: name,
              workDate: record.workDate,
              startTime: record.startTime,
              endTime: record.endTime,
              amount: record.amount
            });
            i++;
          });
        });
      }
      }, err => {
        this.snackbar.openSnackbarErrorCust("Failed to fetch billing information: " + err.error.error);
      });
  }

  pay() {
    var body = {
      amount: Number(this.form.get("dollars")?.value + "." + this.form.get("cents")?.value)
    }
    console.log(body);
    this.http.post<any>("api/pay/" + this.info.requestID + "/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to pay " + body.amount + ": " + result.status);
      } else if(result.status == 200) {
          window.location.reload();
      }
      }, err => {
        this.snackbar.openSnackbarErrorCust("Failed to pay " + body.amount + ": " + err.error.error);
      });
  }

}
