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
   * @param phoneNum the phone number as just numbers
   * @returns a phone number in the format (555) 555-5555
   */
  formatPhone(phoneNum: string): string {
    return '(' + phoneNum.substring(0,3) + ') ' + phoneNum.substring(3,6) + '-' + phoneNum.substring(6,10);
  }

  /**
   * Parses a date object into a string representing a date as YYYY-MM-DD
   * 
   * @param date a Date object
   * @returns a string representing the date as YYYY-MM-DD
   */
  parseMomentDateToString(date: Date): string {
    console.log(date);
    return date.toISOString(). slice(0, 10);
  }
}
