import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DAYS } from 'src/app/global-variables';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class FormattingModule { 

  /**
   * Formats a phone number nicely
   * 
   * @param phoneNum the phone number as just digits
   * @returns a phone number in the format (555) 555-5555
   */
  formatPhone(phoneNum: string): string {
    return '(' + phoneNum.substring(0,3) + ') ' + phoneNum.substring(3,6) + '-' + phoneNum.substring(6,10);
  }

  /**
   * Formats a social security number nicely
   * 
   * @param ssn a social security number as just digits
   * @returns a social security number in the format 555-55-5555
   */
  formatSSN(ssn: string): string {
    return ssn.substring(0,3) + '-' + ssn.substring(3,5) + '-' + ssn.substring(5,9);
  }

  /**
   * Parses a date object into a string representing a date as YYYY-MM-DD
   * 
   * @param date a Date object
   * @returns a string representing the date as YYYY-MM-DD
   */
  parseMomentDateToString(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  /**
   * Creates a string containing days from an array of them as numbers
   * 
   * @param arr weekdays listed as numbers
   * @returns a string of days instead
   */
   getDaysString(arr: Array<number>): string {
    if(arr.length == 0) {
      return "none";
    }

    var daysString: string = '';
    arr.forEach((element : number) => {
      if(DAYS.sunday == element) {
        daysString += "Sunday, "
      }
      if(DAYS.monday == element) {
        daysString += "Monday, "
      }
      if(DAYS.tuesday == element) {
        daysString += "Tuesday, "
      }
      if(DAYS.wednesday == element) {
        daysString += "Wednesday, "
      }
      if(DAYS.thursday == element) {
        daysString += "Thursday, "
      }
      if(DAYS.friday == element) {
        daysString += "Friday, "
      }
      if(DAYS.saturday == element) {
        daysString += "Saturday, "
      }
    });
    return daysString.substring(0, daysString.length-2);
  }
}
