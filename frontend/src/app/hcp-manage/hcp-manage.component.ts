import { HCP, hcpApplicant } from './../interfaces/HCP';
import { Roles, HCP_LABELS, HCP_TYPE } from 'src/app/global-variables';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveSmDialogComponent } from '../dialog-components/remove-sm-dialog/remove-sm-dialog.component';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormattingModule } from '../modules/formatting/formatting.module';

@Component({
  selector: 'app-hcp-manage',
  templateUrl: './hcp-manage.component.html',
  styleUrls: ['./hcp-manage.component.css']
})
export class HcpManageComponent implements OnInit {
  hcps: Array<HCP> = new Array<HCP>();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  isShown: boolean = false;

  form: FormGroup;

  selected: HCP = {
    userID: -1,
    username: "unavailable",
    firstName: "unavailable",
    lastName: "unavailable",
    phoneNumber: "0000000000",
    postalAddress: "unavailable",
    email: "unavailable",
    role: {
      type: Roles.hcp,
      pID: -1
    }
  }

  selectedInfo: hcpApplicant = {
    pID: -1,
    firstName: "unavailable",
    lastName: "unavailable",
    sex: "unavailable",
    ssn: "000000000",
    salary: -1,
    typeHS: -1,
    qualification: "unavailable",
    qualificationDate: "01/01/01",
    yearOExp: -1,
    phoneNumber: "0000000000",
    postalAddress: "unavailable",
    dateOfBirth: "unavailable",
    email: "unavailable",
    enroll: true,
    schedule: {},
    billingAccount: {
      total: -1,
      unPaidTotal: -1,
      paidTotal: -1,
      records: []
    },
    deleted: false,
    updateTime: "unavailable",
    advertiseID: -1,
    userID: -1
  }

  get nurse() {return HCP_TYPE.nurse};
  get physiotherapist() {return HCP_TYPE.physiotherapist};
  get psychiatrist() {return HCP_TYPE.psychiatrist};
  get hcpLabels() {return HCP_LABELS};

  constructor(public dialog: MatDialog, public format: FormattingModule,
    private snackbar: SnackbarModule, private http: HttpClient, private fb: FormBuilder) { 
      this.form = this.fb.group({
        dollars: ['', [Validators.required, Validators.pattern("[0-9]+")]],
        cents: ['', [Validators.required, Validators.pattern("[0-9]{2}")]]
      });
    }

  /**
   * Opens dialog to remove a user from the system
   * 
   * @param first the firstname of the account
   * @param last the lastname of the account
   * @param id the id of the account
   */
  openRemoveDialog(first: string, last: string, id: number) {
    const myCompDialog = this.dialog.open(RemoveSmDialogComponent, { data: {firstName: first, lastName:last, id: id} });
    myCompDialog.afterClosed().subscribe((res) => {
      if(res.data == true) {
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
    // get hcp from back end
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch HCPs: " + result);
      } else if(result.status == 200) {
        result.body.forEach((element: any) => {
          if(element.role.type == Roles.hcp) {
           this.hcps.push(element);
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch HCPs: " + (err.error.error? err.error.error : err.message));
    });
  }

  select(selected: HCP) {
    this.selected = selected;

    this.http.get<any>("api/applicant/" + selected.role.pID + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch HCP details: " + result);
        console.log("Failed to fetch HCP " + selected.role.pID + "'s details: " + result);
      } else if(result.status == 200) {
        this.selectedInfo = result.body;
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch HCP details: " + (err.error.error? err.error.error : err.message));
      console.log("Failed to fetch HCP " + selected.role.pID + "'s details: " + (err.error.error? err.error.error : err.message));
    });

    this.isShown = true;
  }

  pay() {
    var body = {
      amount: Number(this.form.get("dollars")?.value + "." + this.form.get("cents")?.value)
    }
    console.log(body);
    this.http.post<any>("api/hcp/pay/" + this.selectedInfo.pID + "/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to pay " + body.amount + ": " + result.status);
      } else if(result.status == 200) {
        this.selectedInfo.billingAccount.total = result.body.total;
        this.selectedInfo.billingAccount.paidTotal = result.body.paidTotal;
        this.selectedInfo.billingAccount.unPaidTotal = result.body.unPaidTotal;
      }
      }, err => {
        this.snackbar.openSnackbarErrorCust("Failed to pay " + body.amount + ": " + err.error.error);
      });
  }

}
