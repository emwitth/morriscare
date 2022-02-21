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
}
