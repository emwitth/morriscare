import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ApiModule { 

  constructor(private router: Router, private http: HttpClient){}

  getListOfUsers(type: string) {
    this.http.get<any>("api/users", { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        //
      } else if(result.status == 200) {
        console.log(result.body);
        
      }
    }, err => {
      //
    });
  }

}
