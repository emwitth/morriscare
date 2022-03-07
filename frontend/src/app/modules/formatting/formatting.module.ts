import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    return ssn.substring(0,3) + '-' + ssn.substring(3,4) + '-' + ssn.substring(4,8);
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
}
