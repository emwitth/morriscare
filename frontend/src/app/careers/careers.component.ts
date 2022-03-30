import { Component, OnInit } from '@angular/core';
import { HCP_LABELS } from '../global-variables';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  get hcpLabels() {return HCP_LABELS};

  constructor() { }

  ngOnInit(): void {
  }

}
