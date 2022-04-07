import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hcp-schedule',
  templateUrl: './hcp-schedule.component.html',
  styleUrls: ['./hcp-schedule.component.css']
})
export class HcpScheduleComponent implements OnInit {

  selected!: Date | null;

  constructor() { }

  ngOnInit(): void {
  }

}
