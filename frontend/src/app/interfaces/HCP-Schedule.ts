import { CTRequest } from './CTRequest';

/**
 * Interface discribing a schedule an HCP would be using
 */

// interfaces to discribe json coming from the backend
export interface hcpSchedule {
    [key: number]: Array<CTRequest>
}

export interface scheduleInfo {
    scheduleID: number,
    startDate: string,
    startTime: string,
    endTime: string,
    numDaysRequested: number,
    daysRequested: Array<number>
}