import { Requirements, AssignmentObject, Record } from './CTRequest';

/**
 * Interface discribing a schedule an HCP would be using
 */

// interfaces to discribe json coming from the backend
export interface hcpSchedule {
    requestID: number,
    patientFirstName: string,
    patientLastName: string,
    sex: string,
    dateOfBirth: string,
    locationOfService: string,
    patientPhoneNumber: string,
    patientEmail: string,
    hourlyRate: number,
    requirements: Requirements,
    distribution: {
        assigned: Array<AssignmentObject>,
        unassigned: Array<number>
    },
    deleted: boolean,
    updateTime: string,
    billingAccount: {
        total: number,
        unPaidTotal: number,
        paidTotal: number,
        records: Array<Record>
    },
    end: boolean,
    userID: number,
    schedule: Array<scheduleInfo>,
    workDates: Array<string>
}

export interface scheduleInfo {
    scheduleID: number,
    startDate: string,
    startTime: string,
    endTime: string,
    numDaysRequested: number,
    daysRequested: Array<number>
}