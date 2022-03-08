import { Roles } from 'src/app/global-variables';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiModule } from 'src/app/modules/api/api.module';
import { qIDpair } from 'src/app/interfaces/QIDPair';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  // to control display with ngIf
  isLoginPassed: boolean = false; // true once user uses correct username/password
  isIncorrectLogin: boolean = false; // true if user tries with a wrong password or username
  isQuestionFailed: boolean = false; // true once user fails to answer a security question correctly

  // array of personal information once password and username is entered
  info: Array<string> = [];

  // forms
  loginForm: FormGroup;
  questionsForm: FormGroup;

  // for tracking which question is current
  questionIndex: number = -1;
  question: string = '';

  // arrays containing the questions and answers in random order
  questionArray: Array<string> = new Array;
  answerArray: Array<string> = new Array;

  // array containing all questions
  allQuestions: Array<qIDpair> = new Array<qIDpair>();

  questions = {
    question1: 'What was the name of your first pet?',
    question2: 'What is the name of your second pet?',
    question3: 'What is the name of your third pet?'
  }

  answers = {
    answer1: 'Jim',
    answer2: 'Garry',
    answer3: 'Bob'
  }

  constructor(private fb: FormBuilder, private router: Router, 
    private api: ApiModule, private http: HttpClient,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) {
      this.loginForm = this.fb.group({
        Username: ['', Validators.required],
        Password: ['', Validators.required]
      }, {});
      this.questionsForm = this.fb.group({
        Answer: ['', Validators.required]
      }, {});
     }

  ngOnInit(): void {
    // fetch all questions for use once user passes initial login
    // done now so that it doesn't have to happen in the middle of another function
    this.allQuestions = this.api.getAllQuestions();
  }

  // close dialogue with false state
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  login() {
    var body = {
      username: this.loginForm.get("Username")?.value,
      pwd: this.loginForm.get("Password")?.value
    }

    this.http.post<any>("api/auth/", body, { observe: "response" }).subscribe(result => {
      console.log(result.body);
      if (result.status != 200) {
        this.isIncorrectLogin = true;
      } else if(result.status == 200) {
        // console.log(result.body);
        // if login passed, store some information
        this.info.push(result.body?.firstName);
        this.info.push(result.body?.lastName);
        this.info.push(result.body?.username);
        this.info.push(result.body?.userID.toString());
        this.info.push(result.body?.role);
        console.log(this.info);

        // setup security questions
        this.questions.question1 = this.allQuestions[result.body?.securityQuestionOneID - 1]?.question;
        this.questions.question2 = this.allQuestions[result.body?.securityQuestionTwoID - 1]?.question;
        this.questions.question3 = this.allQuestions[result.body?.securityQuestionThreeID - 1]?.question;

        // setup answers
        this.answers.answer1 = result.body?.securityQuestionOneAnswer;
        this.answers.answer2 = result.body?.securityQuestionTwoAnswer;
        this.answers.answer3 = result.body?.securityQuestionThreeAnswer;

        // console.log(this.questions);

        this.initializeQuestionArray(this.createRandomArray());

        // if first time logging in
        if(this.answers.answer1 == null) {
          sessionStorage.setItem("firstTime","true");
          sessionStorage.setItem("name", this.info[0]);
          sessionStorage.setItem("last", this.info[1]);
          sessionStorage.setItem("username", this.info[2]);
          sessionStorage.setItem("id", this.info[3]);
          sessionStorage.setItem("role", this.info[4]);
          sessionStorage.setItem("login", 'true');
          if(this.info[4] == Roles.admin) {this.router.navigate(['/admin/settings']);}
          if(this.info[4] == Roles.ct) {this.router.navigate(['/caretaker/settings']);}
          if(this.info[4] == Roles.sm) {this.router.navigate(['/staff/settings']);}
          if(this.info[4] == Roles.hcp) {this.router.navigate(['/hcp/settings']);}
        }
        else {
          this.isLoginPassed = true;
        }
      }
    }, err => {
      this.isIncorrectLogin = true;
    });
  }

  checkFirstTime() {
    if(sessionStorage?.getItem("firstTime") != null) {
      if(sessionStorage?.getItem("firstTime")) {
        return true;
      } 
      return false;
    }
    return false;
  }

  answerQuestion() {
    var answer = this.questionsForm.get('Answer')?.value;
    if(answer == this.answerArray[this.questionIndex]) {
      // set session to logged in
      sessionStorage.setItem("name", this.info[0]);
      sessionStorage.setItem("last", this.info[1]);
      sessionStorage.setItem("username", this.info[2]);
      sessionStorage.setItem("id", this.info[3]);
      sessionStorage.setItem("role", this.info[4]);
      sessionStorage.setItem("login", 'true');

      // close dialogue with true (logged in) state
      this.dialogRef.close({ event: 'close', data: true });
    }
    else if(this.questionIndex < 2) {
      // go on to next question if got wrong
      this.updateDisplayedQuestion();
      this.isQuestionFailed = true;
    }
    else
    {
      // end if no more questions
      this.dialogRef.close({ event: 'close', data: false });
    }
  }

  // FUNCTIONS FOR SECURITY QUESIONS

  /**
   * Increments what question is displayed
   */
  updateDisplayedQuestion() {
    this.question = this.questionArray[this.questionIndex+1];
    this.questionIndex++;
  }

  /**
   * Inserts the security questions and answers in their respective array
   * randomly according to the order of the orderArray
   * 
   * @param orderArray an array with the values 1,2,3 in random order
   */
  initializeQuestionArray(orderArray: Array<number>) {
    orderArray.forEach(element => {
      if( element == 1) {
        this.questionArray.push(this.questions.question1);
        this.answerArray.push(this.answers.answer1);
      }
      else if(element == 2) {
        this.questionArray.push(this.questions.question2);
        this.answerArray.push(this.answers.answer2);
      }
      else {
        this.questionArray.push(this.questions.question3);
        this.answerArray.push(this.answers.answer3);
      }
    });
    this.updateDisplayedQuestion();
  }

  /**
   * Generates an array described below
   * 
   * @returns an array with the values 1,2,3 in a random order
   */
  createRandomArray(): Array<number> {
    var arr = [0,0,0];
    var count = 0;
    while( count < 3) {
      var temp = this.GetRandom(3);
      if(!arr.includes(temp))
      {
        arr[count] = temp;
        count++;
      }
    }
    return arr;
  }

  /**
   * Gets a random number, you get it :P
   */
  GetRandom(max: number){
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

}
