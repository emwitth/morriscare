import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { CTRequest, AssignmentObject } from '../interfaces/CTRequest';

export interface punch {
  in: string,
  hasIn: boolean,
  out: string
  hasOut: boolean
}

export interface info {
  start: string,
  end: string,
  request: CTRequest
}

@Component({
  selector: 'app-hcp-schedule',
  templateUrl: './hcp-schedule.component.html',
  styleUrls: ['./hcp-schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HcpScheduleComponent implements OnInit {

  selectedDate!: Date | null;
  today: Date = new Date("4-19-22");

  dataIn: boolean = false;

  dates : Map<String, Array<info>> = new Map<String, Array<info>>();

  time: string = "";
  lastTime: string = "00:00";
  isLastTimeBefore: boolean = true;
  loggedTimes : Map<String, Array<punch>> = new Map<String, Array<punch>>();

  constructor(private format: FormattingModule, private http: HttpClient,
    private snackbar: SnackbarModule) { }

  ngOnInit(): void {
    var pID = sessionStorage.getItem("pID");
    this.http.get<any>("api/schedule/" + pID + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        console.log("!200", result.body);
        this.snackbar.openSnackbarErrorCust("Error retrieving hcp " + pID + ": " + result);
      } else if(result.status == 200) {
        console.log(result.body);
        result.body.forEach((request: CTRequest) => {
          request.distribution.assigned.forEach((element: AssignmentObject) => {
            console.log(
              element.schedule.startDate, 
              element.schedule.startTime, 
              element.schedule.endTime, 
              element.schedule.numDaysRequested, 
              element.schedule.daysRequested
              );
            this.addAllDateElements(
              element.schedule.startDate,
              element.schedule.numDaysRequested,
              element.schedule.daysRequested,
              element.schedule.startTime, 
              element.schedule.endTime,
              request
            );
          });
        });
        this.dataIn = true;
      }
    }, err => {
      console.log("err", err);
      this.snackbar.openSnackbarErrorCust(err.error.error? err.error.error : err.message);
    });
  }

  addAllDateElements(startDate: string, numDays: number, daysOfWeek: Array<number>, start: string, end: string, request: CTRequest) {
    var count: number = 0;
    var stepDate: Date = this.format.parseDate(startDate);
    var info: info = {
      start: start,
      end: end,
      request: request
    }
    while(count < numDays) {
      if(daysOfWeek.includes(stepDate.getDay())) {
        var currentTimes = this.dates.has(stepDate.toString()) ? this.dates.get(stepDate.toString()) : new Array<info>();
        currentTimes?.push(info);
        if(currentTimes != undefined)
          this.dates.set(stepDate.toString(), currentTimes);
        count++;
      }
      stepDate.setDate(stepDate.getDate() + 1);
    }
  }
  
  punch() {
    console.log(this.lastTime, this.time);
    this.isLastTimeBefore = true;
    if(!this.isLastTimeSmaller(this.lastTime, this.time)) {
      this.isLastTimeBefore = false;
      return;
    }
    var day: string = (this.selectedDate != null) ? this.selectedDate.toString() : "";
    var tempArray = this.loggedTimes.has(day) ? this.loggedTimes.get(day) : undefined;
    var array = tempArray != undefined ? tempArray : new Array<punch>();
    console.log(array.length, array);
    if(array?.length == 0) {
      array.push({
        in: this.time,
        hasIn: true,
        out: '',
        hasOut: false
      });
    } else {
      var temp = (array != undefined) ? array.pop() : undefined;
      console.log(temp);
      var last: punch = (temp != undefined) ? temp : {in: "", hasIn: false, out: "", hasOut: false};
      console.log(last);
      if(!last.hasIn) {
        last.in = this.time;
        last.hasIn = true;
      }
      else if (!last.hasOut) {
        last.out = this.time;
        last.hasOut = true;
      }
      else {
        array?.push(last);
        last = {
          in: this.time,
          hasIn: true,
          out: '',
          hasOut: false
        };
      }
      console.log(last);
      array?.push(last);
    }
    this.loggedTimes.set((this.selectedDate != null) ? this.selectedDate.toString() : "", array);
    this.lastTime = this.time;
    console.log(array);
  }

  isLastTimeSmaller(last: string, curr: string): boolean {
    const lh = parseInt(last.substring(0,2));
    const lm = parseInt(last.substring(3,5));
    const ch = parseInt(curr.substring(0,2));
    const cm = parseInt(curr.substring(3,5));

    if (ch > lh) {
      return true;
    }
    else if ( ch == lh && cm > lm) {
      return true;
    }
    else {
      return false;
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
