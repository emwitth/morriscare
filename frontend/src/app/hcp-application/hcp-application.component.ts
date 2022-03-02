import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hcp-application',
  templateUrl: './hcp-application.component.html',
  styleUrls: ['./hcp-application.component.css']
})
export class HcpApplicationComponent implements OnInit {
  id: number = -1;
  type: string = "";

  // forms
  form: FormGroup;

  today: Date = new Date();

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { 
    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
      last: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]*")]],
      dob: ['', Validators.required],
      ssn: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      experience: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      qualifications: ['', Validators.required]
    }, {});
  }

  submit(){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params?.id;
    this.type = this.route.snapshot.params?.type;

    console.log(this.type, this.id);

    console.log(this.today);
  }

}
