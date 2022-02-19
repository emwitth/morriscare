import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) {
      this.form = this.fb.group({
        Username: ['', Validators.required],
        Password: ['', Validators.required]
      }, {});
     }

  ngOnInit(): void {
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

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
    // window.alert("Login successful.");
    this.dialogRef.close({ event: 'close', data: true });
  }

}
