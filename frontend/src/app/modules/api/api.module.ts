import { Roles } from 'src/app/global-variables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from 'src/app/interfaces/StaffMember';
import { UnappCareTaker } from 'src/app/interfaces/CareTaker';
import { HCP } from 'src/app/interfaces/HCP';
import { FormattingModule } from '../formatting/formatting.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ApiModule { 

  constructor(private router: Router, private http: HttpClient, private format: FormattingModule){}

  approveCareTaker(id: string): any{
      this.http.post<any>("api/caretaker_enroll/" + id + "/", { observe: "response" }).subscribe(result => {
      console.log(result.username);
      console.log(result.pwd);
      var temp = {
        username: result.username, 
        pwd: result.pwd
      };

      return temp;
      // toReturn.username = result?.username;
      // toReturn.pwd = result?.pwd;
      if (result.status != 200) {
        console.log("not 200")
        // toReturn.username = result?.username;
        // toReturn.pwd = result?.pwd;
      } else if(result.status == 200) {
        // toReturn.username = result?.username;
        // toReturn.pwd = result?.pwd;
        console.log(200);
        // return result;
        // var toReturn = {
        //   username: result.body.
        // }
      }
    }, err => {
      //
    });
  }

  getUnapprovedCTs(): Array<UnappCareTaker> {
    var toReturn: Array<UnappCareTaker> = [];
    this.http.get<any>("api/caretakers", { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        //
      } else if(result.status == 200) {
        // console.log(result.body);
        result.body.forEach((element: any) => {
          // console.log(element.roleID, type);
          var temp: UnappCareTaker = {
            firstName: element.firstName,
            lastName: element.lastName,
            postalAddress: element.postalAddress,
            email: element.email,
            phoneNumber: this.format.formatPhone(element.phoneNumber),
            takerID: element.takerID,
            enroll: element.enroll
          };

          if(element.enroll == '0') {
            toReturn.push(temp);
          }
 
        });
      }
    }, err => {
      //
    });
    return toReturn;
  }

  getListOfUsers(type: string): Array<any> {
    var toReturn: Array<any> = [];
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        //
      } else if(result.status == 200) {
        // console.log(result.body);
        result.body.forEach((element: any) => {
          // console.log(element.roleID, type);
          if(element.roleID == type) {
           toReturn.push(this.fillElement(type, element)); 
          }
        });
      }
    }, err => {
      //
    });
    return toReturn;
  }

  private fillElement(type: string, element: any): any {
    // console.log(element);
    var toReturn: StaffMember = {firstName: "string",
      lastName: "string",
      postalAddress: "string",
      email: "string",
      phoneNumber: "string",
      userID: "string",
      username: "string"};
    toReturn.firstName = element.firstName;
    toReturn.lastName = element.lastName;
    toReturn.postalAddress = element.postalAddress;
    toReturn.email = element.email;
    toReturn.phoneNumber = this.format.formatPhone(element.phoneNumber);
    toReturn.userID = element.userID;
    return toReturn;
  }

}
