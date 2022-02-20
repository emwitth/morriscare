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

  // to control display with ngIf
  isLoginPassed: boolean = false; // true once user uses correct username/password
  isQuestionFailed: boolean = false; // true once user fails to answer a security question correctly

  // forms
  loginForm: FormGroup;
  questionsForm: FormGroup;

  // for tracking which question is current
  questionIndex: number = -1;
  question: string = '';

  // arrays containing the questions and answers in random order
  questionArray: Array<string> = new Array;
  answerArray: Array<string> = new Array;

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

  constructor(private fb: FormBuilder,
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

  ngOnInit(): void {}

  // close dialogue with false state
  closeDialog() { this.dialogRef.close({ event: 'close', data: false }); }

  login() {
    var body = {
      username: this.loginForm.get('Username')?.value,
      password: this.loginForm.get('Password')?.value
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

    // if passed, setup security questions
    this.initializeQuestionArray(this.createRandomArray());
    // window.alert("Login successful.");
    this.isLoginPassed = true;
  }

  answerQuestion() {
    var answer = this.questionsForm.get('Answer')?.value;
    console.log(answer == this.answerArray[this.questionIndex]);
    if(answer == this.answerArray[this.questionIndex]) {
      // set session to logged in
      sessionStorage.setItem("name", "evan");
      sessionStorage.setItem("username", "evan01");
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
    console.log(this.questionIndex + ' ' + this.question, this.questionArray);
  }

  /**
   * Inserts the security questions and answers in their respective array
   * randomly according to the order of the orderArray
   * 
   * @param orderArray an array with the values 1,2,3 in random order
   */
  initializeQuestionArray(orderArray: Array<number>) {
    console.log(orderArray);
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
    console.log(this.questionArray);
    console.log(this.answerArray);
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
