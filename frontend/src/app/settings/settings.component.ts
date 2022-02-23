import { HttpClient } from '@angular/common/http';
import { ApiModule } from './../modules/api/api.module';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Question {
  value: string,
  index : number
}

export interface qIDpair {
  securityQuestionID: number,
  question: string
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // forms
  passwordForm: FormGroup;
  questionsForm: FormGroup;

  questionOne: number = 0;
  questionTwo: number = 0;
  questionThree: number = 0;

  allQuestions: Array<string> = new Array<string>();

  questions: Question[] = [
    // { value:"How much wood could a wood chuck chuck if a wood chuck could chuck wood?", index: 1 },
    // { value:"What is the name of your first pet?", index: 2 },
    // { value: "What city did your parents meet in?", index: 3 },
    // { value: "Where did you go to college?", index: 4 } ,
    // { value: "What city were you born in?", index: 5 } ,
    // { value: "How do you do that?", index: 6 }
  ];

  constructor(private fb: FormBuilder, private api: ApiModule,
    private http: HttpClient, private _snackBar: MatSnackBar,) {
    this.passwordForm = this.fb.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(6), 
        passwordContainsSpecialValidator(), 
        Validators.pattern("[~!@#%&\^\$\*\+a-zA-Z0-9]*")]],
      ConfPassword: ['', [Validators.required, passwordsMatchValidator]]
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

   submitPassword() {}

   submitSecurityQuestions() {
    var result: boolean = this.api.updateUserInfo(sessionStorage.getItem("id"), {
      securityQuestionOneID: this.questionsForm.get("Q1")?.value,
      securityQuestionOneAnswer:this.questionsForm.get("A1")?.value,
      securityQuestionTwoID:this.questionsForm.get("Q2")?.value,
      securityQuestionTwoAnswer:this.questionsForm.get("A2")?.value,
      securityQuestionThreeID:this.questionsForm.get("Q3")?.value,
      securityQuestionThreeAnswer:this.questionsForm.get("A3")?.value
    })
    // console.log("Result", result);
    // if(result) {
    //   this.openSnackBar("Success!", "Okay");
    // }
    // else {
    //   this.openSnackBar("An Error Occured, please try again", "Okay");
    // }
   }

  ngOnInit(): void { 
    this.http.get<any>("api/questions", { observe: "response" }).subscribe(result => {
      // console.log(result.body);
      if (result.status != 200) {
        //
      } else if(result.status == 200) {
        // console.log(result.body);
        result.body.forEach((element: qIDpair) => {
          this.questions.push({
            value: element.question, index: element.securityQuestionID
          });
        });
        // console.log(this.allQuestions);
      }
    }, err => {
      //
    });
  }

}

function passwordContainsSpecialValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const hasWantedValue = /[~!@#%&\^\$\*\+]/.test(value); //{~, !,@, #, $, %, ˆ, &, *, +}

    return !hasWantedValue ? { lacksSpecialCharacter: true } : null;
  };
}

function passwordsMatchValidator(fg: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const other = fg.get('NewPassword')?.value
    return !(value == other) ? { passwordsDontMatch: true } : null;
  };
}

function passwordMatchValidator(g: AbstractControl) {
  const c1 = g.get('NewPassword');
  const c2 = g.get('ConfPassword');
  
  return c1?.value == c2?.value ? null : {'mismatch': true};
}