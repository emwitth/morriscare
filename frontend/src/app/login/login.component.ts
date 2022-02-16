import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { 
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    }, {});
  }

  ngOnInit(): void { }

  login(){
    var body = {
      username: this.form.get('Username')?.value,
      password: this.form.get('Password')?.value
    }

    // this.http.post<any>("/api/user/login", body, { observe: "response" }).subscribe(result => {
    //   console.log(result);
    //   if (result.status != 200) {
    //     window.alert(result.body.message);
    //   } else {
    //     sessionStorage.setItem("name", result.body.data?.first_name);
    //     sessionStorage.setItem("username", result.body.data?.user_name);
    //     sessionStorage.setItem("login", 'true');
    //     window.alert("Login successful.");
    //     this.router.navigate(['/home']);
    //   }
    // }, err => {
    //   window.alert(err.error.message);
    // });

    sessionStorage.setItem("name", "evan");
    sessionStorage.setItem("username", "evan01");
    sessionStorage.setItem("login", 'true');
    window.alert("Login successful.");
    this.router.navigate(['/home']);
  }

  getUsernameErrorMessage() {
    return this.form.get('Username')?.hasError('required') ? 'You must enter a value' : 'Other' ;
  }

  getPasswordErrorMessage() {
    return this.form.get('Password')?.hasError('required') ? 'You must enter a value' : 'Other' ;
  }
}
