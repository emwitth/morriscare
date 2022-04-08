/**
 * Interface discribing a schedule an HCP would be using
 */

// interfaces to discribe json coming from the backend
export interface hcpSchedule {
    [key: number]: Array<assignment>
}

export interface assignment {
    startDate: string,
    startTime: string,
    endTime: string,
    numDaysRequested: number,
    daysRequested: Array<number>
}

export interface scheduleInfo {
    scheduleID: number,
    startDate: string,
    startTime: string,
    endTime: string,
    numDaysRequested: number,
    daysRequested: Array<number>
}