import { Component, OnInit } from '@angular/core';
import { FormattingModule } from '../modules/formatting/formatting.module';

@Component({
  selector: 'app-hcp-schedule',
  templateUrl: './hcp-schedule.component.html',
  styleUrls: ['./hcp-schedule.component.css']
})
export class HcpScheduleComponent implements OnInit {

  selected!: Date | null;

  datesStartTime : Array<Date> = [];
  datesEndTime : Array<Date> = [];

  constructor(private format: FormattingModule) { }

  ngOnInit(): void {
    this.addAllDateElements("2022-04-03", 8, [2,4], "16:00", "18:00");
  }

  addAllDateElements(startDate: string, numDays: number, daysOfWeek: Array<number>, start: string, end: string ) {
    var count: number = 0;
    var stepDate: Date = this.format.parseDate(startDate);
    var startHour: number = +start.substring(0,2);
    var startMinute: number = +start.substring(3,5);
    var endHour: number = +end.substring(0,2);
    var endMinute: number = +end.substring(3,5);
    while(count < numDays) {
      if(daysOfWeek.includes(stepDate.getDay())) {
        stepDate.setHours(startHour);
        stepDate.setMinutes(startMinute);
        this.datesStartTime.push(new Date(stepDate));
        stepDate.setHours(endHour);
        stepDate.setMinutes(endMinute);
        this.datesEndTime.push(new Date(stepDate));
        count++;
      }
      stepDate.setDate(stepDate.getDate() + 1);
    }
  }

}
