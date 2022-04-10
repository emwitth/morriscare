import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormattingModule } from '../modules/formatting/formatting.module';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { SnackbarModule } from '../modules/snackbar/snackbar.module';
import { CTRequest, AssignmentObject } from '../interfaces/CTRequest';

export interface punch {
  in: string,
  inHour: number,
  inMin: number,
  hasIn: boolean,
  out: string,
  outHour: number,
  outMin: number,
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

  // for the day selected on the schedule
  selectedDate!: Date | null;
  // today (duh)
  today: Date = new Date();
  // variable to make sure the calendar doesn't load until we get data from the backend
  dataIn: boolean = false;
  // holds all of the information about the hcp's schedule
  dates : Map<String, Array<info>> = new Map<String, Array<info>>();

  // variables for the log panel
  time: string = ""; // the time selected
  isLastTimeBefore: boolean = true; // indicates last punch in log is earlier than time selected
  loggedTimes : Map<String, Array<punch>> = new Map<String, Array<punch>>(); // the logs for each day
  totals : Map<string, string> = new Map<string, string>(); // the totals for each day
  lastTimes: Map<string, string> = new Map<string, string>(); // the last times logged for each day

  constructor(private format: FormattingModule, private http: HttpClient,
    private snackbar: SnackbarModule) { }

  ngOnInit(): void {
    // get the hcp's id from the session
    var pID = sessionStorage.getItem("pID");
    // get the schedule of this hcp
    this.http.get<any>("api/schedule/" + pID + "/", { observe: "response" }).subscribe(result => {
      if (result.status != 200) {
        this.snackbar.openSnackbarErrorCust("Error retrieving hcp " + pID + ": " + result);
      } else if(result.status == 200) {
        result.body.forEach((request: CTRequest) => {
          request.distribution.assigned.forEach((element: AssignmentObject) => {
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
      this.snackbar.openSnackbarErrorCust(err.error.error? err.error.error : err.message);
    });
  }

  /**
   * Parses all of the dates from a request and fills the appropriate data structures
   * 
   * @param startDate the date with which this assignment starts
   * @param numDays the number of days this request goes
   * @param daysOfWeek the days of the week this request is on
   * @param start the start time of the request
   * @param end the end time of the request
   * @param request the whole request because I am lazy and am putting it here for easy access later
   */
  addAllDateElements(startDate: string, numDays: number, daysOfWeek: Array<number>, start: string, end: string, request: CTRequest) {
    // cariables to keep track of things
    var count: number = 0;
    var stepDate: Date = this.format.parseDate(startDate);
    var info: info = {
      start: start,
      end: end,
      request: request
    }
    // loop through all days from the start until we find all of the days enumerated
    while(count < numDays) {
      // only do anything if the day we are at is one of the days of the week specified
      if(daysOfWeek.includes(stepDate.getDay())) {
        // get the array which holds any request data that was already on this day
        // (for if assigned to multiple requests on a single day)
        var currentTimes = this.dates.has(stepDate.toString()) ? this.dates.get(stepDate.toString()) : new Array<info>();
        currentTimes?.push(info);
        // should always happen, but the code wants me to be careful
        if(currentTimes != undefined) {
          // update the data structures 
          this.dates.set(stepDate.toString(), currentTimes);
          this.totals.set(stepDate.toString(), "00:00");
          this.lastTimes.set(stepDate.toString(), "00:00");
        }
        // update how many of the days we have found
        count++;
      }
      // increase the date by one
      stepDate.setDate(stepDate.getDate() + 1);
    }
  }
  
  /**
   * Adds a punch to the log, alternates between in and out
   * 
   * @returns to quit if the time should not be appended
   */
  punch() {
    // the selected date as a string, need these guards because it could be null
    // (thanks to it being needed to be used as the output from the calendar)
    var day: string = (this.selectedDate != null) ? this.selectedDate.toString() : "";
    // the last time that was punched for this log
    var lastTime = this.lastTimes.get(day);
    // parse some numbers now so we don't have to later
    const lh = parseInt(lastTime != undefined ? lastTime.substring(0,2) : "00");
    const lm = parseInt(lastTime != undefined ? lastTime.substring(3,5) : "00");
    const ch = parseInt(this.time.substring(0,2));
    const cm = parseInt(this.time.substring(3,5));
    // set this to true so we don't show error message by default
    this.isLastTimeBefore = true;
    // if the time is smaller than the previous punch, we shouldn't add it
    if(!this.isLastTimeSmaller(lh, lm, ch, cm)) {
      this.isLastTimeBefore = false;
      return;
    }
    // now we can do the rest of the work
    // we get the array or we get an undefined
    // (undefined shouldn't happen, but the code doesn't know that)
    var tempArray = this.loggedTimes.has(day) ? this.loggedTimes.get(day) : undefined;
    // if we got an undefined, we make a new array
    var array = tempArray != undefined ? tempArray : new Array<punch>();
    // if there is nothing in the array yet, we push the first punch
    if(array.length == 0) {
      array.push({
        in: this.time,
        inHour: ch,
        inMin: cm,
        hasIn: true,
        out: '',
        outHour: -1,
        outMin: -1,
        hasOut: false
      });
    }
    else {
      // get the first element or nothing
      // (we should never get nothing, but yknow, the code doesn't realize that)
      var temp = (array != undefined) ? array.pop() : undefined;
      // if there somehow was no punches even though we know the size is not zero
      // we set a new punch, otherwise we use what we popped
      var last: punch = (temp != undefined) ? temp : 
      {
        in: "",
        inHour: -1,
        inMin: -1,
        hasIn: false,
        out: "",
        outHour: -1,
        outMin: -1,
        hasOut: false
      };
      // if there is nothing in the punch (this should be impossible)
      // then we add the current time in as the time selected
      if(!last.hasIn) {
        last.in = this.time;
        last.inHour = ch;
        last.inMin = cm;
        last.hasIn = true;
      }
      // if there is nothing in the out section, we add the current time there
      else if (!last.hasOut) {
        last.out = this.time;
        last.outHour = ch;
        last.outMin = cm;
        last.hasOut = true;
      }
      // otherwise we add a new punch because the last one is full,
      // making the current time selected the in value
      else {
        array?.push(last);
        last = {
          in: this.time,
          inHour: ch,
          inMin: cm,
          hasIn: true,
          out: '',
          outHour: -1,
          outMin: -1,
          hasOut: false
        };
      }
      // we add this value into the array
      array.push(last);
    }
    // we have to update all of the maps with our new value
    this.loggedTimes.set(day, array);
    this.lastTimes.set(day, this.time)
    this.totals.set(day, this.calculateTotal(array));
  }

  /**
   * Calculates the total time over all punches for a day
   * 
   * @param array the array of time punches for the current day
   * @returns a string representing the total time
   */
  calculateTotal(array: Array<punch>): string{
    // totals start at zero
    var totalHour: number = 0;
    var totalMin: number = 0;
    // loop through all punches
    array.forEach((punch: punch) => {
      // punch must contain both in and out or it is incomplete and shouldn't be added yet
      if(punch.hasOut) {
        // if the first minute is smaller, the difference is easy
        if(punch.inMin < punch.outMin) {
          totalHour += punch.outHour - punch.inHour;
          totalMin += punch.outMin - punch.inMin;
        }
        // if the first minute is larger, we have to borrow from the hours 
        else {
          totalHour += punch.outHour - punch.inHour - 1;
          totalMin += punch.outMin - punch.inMin + 60;
        }
      }
    });
    // if total minutes is over an hour, we move that into the hour variable
    totalHour += Math.floor(totalMin / 60);
    totalMin = (totalMin % 60);
    // append a 0 to the values if they are going to appear as just a single digit
    var stringHour: string = totalHour < 10 ? "0" + totalHour : "" + totalHour;
    var stringMin: string = totalMin < 10 ? "0" + totalMin : "" + totalMin;
    // concatinate them together
    return stringHour + ":" + stringMin;
  }

  /**
   * Indicate whether the first time is after the second one
   * 
   * @param lh last hour
   * @param lm last minute
   * @param ch current hour
   * @param cm current minute
   * @returns boolean representing whether the last time is before the current time
   */
  isLastTimeSmaller(lh: number, lm: number, ch: number, cm: number): boolean {
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

  /**
   * Used by the calendar to color in the days 
   * an hcp has been assigned to work
   * 
   * @param cellDate a date
   * @param view the view the calendar is at (year, month, etc)
   * @returns the css class which to color certain dates with
   */
  assignedDays: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      return this.dates.has(cellDate.toString()) ? 'example-custom-date-class' : '';
    }

    return '';
  };

}
