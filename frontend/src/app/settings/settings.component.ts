import { HttpClient } from '@angular/common/http';
import { ApiModule } from './../modules/api/api.module';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { qIDpair } from '../interfaces/QIDPair';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // forms
  passwordForm: FormGroup;
  questionsForm: FormGroup;

  // indicates old password is correct
  isIncorrectLogin: boolean = false;

  // it's the list of questions
  questions: Array<qIDpair> = new Array<qIDpair>();

  constructor(private fb: FormBuilder, private api: ApiModule,
    private http: HttpClient, private _snackBar: MatSnackBar,) {
    this.passwordForm = this.fb.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(6), 
        passwordContainsSpecialValidator(), 
        Validators.pattern("[~!@#%&\^\$\*\+a-zA-Z0-9]*")]],
      ConfPassword: ['', [Validators.required]]
    }, {validators: passwordMatchValidator});
    this.questionsForm = this.fb.group({
      Q1: ['', Validators.required],
      Q2: ['', Validators.required],
      Q3: ['', Validators.required],
      A1: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[A-Za-z0-9]*")]],
      A2: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[A-Za-z0-9]*")]],
      A3: ['', [Validators.required, Validators.minLength(4), Validators.pattern("[A-Za-z0-9]*")]]
    }, {});
   }

   /**
    * Submits the new password
    */
   submitPassword() {
    this.isIncorrectLogin = false;
    var body = {
      username: sessionStorage.getItem("username"),
      pwd: this.passwordForm.get("OldPassword")?.value
    }

    // check if old password is correct (uses same endpoint as login)
    this.http.post<any>("api/auth/", body, { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.isIncorrectLogin = true;
      } else if(result.status == 200) {
        // if the old password was correct, change the password to the new password
        this.api.updateUserInfo(sessionStorage.getItem("id"), {
          pwd: this.passwordForm.get("NewPassword")?.value
        })
      }
    }, err => {
      this.isIncorrectLogin = true;
    });
  }

   /**
    * Submits the new set of security questions
    */
   submitSecurityQuestions() {
    this.api.updateUserInfo(sessionStorage.getItem("id"), {
      securityQuestionOneID: this.questionsForm.get("Q1")?.value,
      securityQuestionOneAnswer:this.questionsForm.get("A1")?.value,
      securityQuestionTwoID:this.questionsForm.get("Q2")?.value,
      securityQuestionTwoAnswer:this.questionsForm.get("A2")?.value,
      securityQuestionThreeID:this.questionsForm.get("Q3")?.value,
      securityQuestionThreeAnswer:this.questionsForm.get("A3")?.value
    });
   }

  ngOnInit(): void { 
    // get questions for use in the dropdowns
    console.log("HAHA", this.api.getAllQuestions());
    this.questions = this.api.getAllQuestions();
  }

}

/**
 * Validator to ensure a password contains a special character
 * The characters are {~, !, @, #, $, %, ˆ, &, *, +}
 * 
 * @returns a validator funtion
 */
function passwordContainsSpecialValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const hasWantedValue = /[~!@#%&\^\$\*\+]/.test(value);

    return !hasWantedValue ? { lacksSpecialCharacter: true } : null;
  };
}

/**
 * Validator to ensure a new password and the confirmation password match
 * 
 * @param g the form group
 * @returns a group-scoped validator function
 */
function passwordMatchValidator(g: AbstractControl) {
  const c1 = g.get('NewPassword');
  const c2 = g.get('ConfPassword');
  
  return c1?.value == c2?.value ? null : {'mismatch': true};
}