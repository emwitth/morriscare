import { SnackbarModule } from './../snackbar/snackbar.module';
import { Roles } from 'src/app/global-variables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from 'src/app/interfaces/StaffMember';
import { UnappCareTaker } from 'src/app/interfaces/CareTaker';
import { HCP } from 'src/app/interfaces/HCP';
import { FormattingModule } from '../formatting/formatting.module';
import { qIDpair } from 'src/app/interfaces/QIDPair';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ApiModule { 

  constructor(private router: Router, private http: HttpClient, 
    private snackbar: SnackbarModule, private format: FormattingModule){}

  /**
   * Fetches all the security questions possible.
   * 
   * @returns a list of question and id pairs
   */
  getAllQuestions() {
    var allQuestions: Array<qIDpair> = new Array<qIDpair>();
    this.http.get<any>("api/questions", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch security questions");
      } else if(result.status == 200) {
        result.body.forEach((element: qIDpair) => {
          allQuestions.push(element);
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch security questions");
    });
    return allQuestions;
  }

  /**
   * Updates the given information in body in the user of ID id.
   * 
   * @param id the id of the user
   * @param body the information to change (a JSON object)
   * @returns true indicating success, false otherwise
   */
  updateUserInfo(id: string | null, body: any): boolean {
    if(id == null) {
      return false;
    }
    console.log(body);
    this.http.put<any>("api/user/" + id + "/", body, { observe: "response" }).subscribe(result => {
      console.log(result.status);
      if (result.status != 200) {
        this.snackbar.openSnackbarError();
        return false;
      } else {
        this.snackbar.openSnackbarSuccess();
        console.log("I WAS HIT");
        return true;
      }
    }, err => {
      this.snackbar.openSnackbarError();
      return false;
    });
    this.snackbar.openSnackbarError();
    return false;
  }

  /**
   * Fetches an array of unaproved caretakers and their information.
   * 
   * @returns an array of unapproved caretakers
   */
  getUnapprovedCTs(): Array<UnappCareTaker> {
    var toReturn: Array<UnappCareTaker> = [];
    this.http.get<any>("api/caretakers", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch unapproved caretakers. Maybe reload the page or contact an administrator.");
      } else if(result.status == 200) {
        result.body.forEach((element: any) => {
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
      this.snackbar.openSnackbarErrorCust("Failed to fetch unapproved caretakers. Maybe reload the page or contact an administrator.");
    });
    return toReturn;
  }

  /**
   * Fetches a list of users of a given type and their information
   * 
   * @param type the type of the user (types in gloabl variables)
   * @returns an array of users of type
   */
  getListOfUsers(type: string): Array<any> {
    var toReturn: Array<any> = [];
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Failed to fetch users of type" + type + ". Maybe reload the page or contact an administrator.");
      } else if(result.status == 200) {
        result.body.forEach((element: any) => {
          if(element.roleID == type) {
           toReturn.push(this.fillElement(type, element)); 
          }
        });
      }
    }, err => {
      this.snackbar.openSnackbarErrorCust("Failed to fetch users of type" + type + ". Maybe reload the page or contact an administrator.");
    });
    return toReturn;
  }

  /**
   * Returns an element of whatever type is wanted for the given type.
   * 
   * @param type returns the element containing the information wanted out of the user list
   * @param element the element from the post request
   * @returns a filled element
   */
  private fillElement(type: string, element: any): any {
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
