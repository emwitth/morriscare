import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

export interface times {
  start: string,
  end: string
}

@Component({
  selector: 'app-hcp-schedule',
  templateUrl: './hcp-schedule.component.html',
  styleUrls: ['./hcp-schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HcpScheduleComponent implements OnInit {

  selectedDate!: Date | null;
  today: Date = new Date();

  dates : Map<String, Array<times>> = new Map<String, Array<times>>();
  loggedTimes : Map<String, Array<times>> = new Map<String, Array<times>>();

  constructor(private format: FormattingModule) { }

  ngOnInit(): void {
    this.addAllDateElements("2022-04-03", 15, [1,2,3,4,5], "6:00", "10:00");
    this.addAllDateElements("2022-04-03", 8, [2,4], "16:00", "18:00");
  }

  addAllDateElements(startDate: string, numDays: number, daysOfWeek: Array<number>, start: string, end: string ) {
    var count: number = 0;
    var stepDate: Date = this.format.parseDate(startDate);
    var times: times = {
      start: start,
      end: end
    }
    while(count < numDays) {
      if(daysOfWeek.includes(stepDate.getDay())) {
        var currentTimes = this.dates.has(stepDate.toString()) ? this.dates.get(stepDate.toString()) : new Array<times>();
        currentTimes?.push(times);
        if(currentTimes != undefined)
          this.dates.set(stepDate.toString(), currentTimes);
        count++;
      }
      stepDate.setDate(stepDate.getDate() + 1);
    }
  }

  assignedDays: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      return this.dates.has(cellDate.toString()) ? 'example-custom-date-class' : '';
    }

    return '';
  };

}
