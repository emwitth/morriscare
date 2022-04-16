import { scheduleInfo } from "./HCP-Schedule"

/**
 * Interfaces describing a single care taker request
 */

export interface Requirements {
  serviceType: number,
  daysRequested: Array<number>,
  startDate: string,
  endDate: string,
  [key: string]: any
}

export interface AssignmentObject {
  schedule: scheduleInfo,
  hcp: number,
  hcpName: string
}

export interface Record {
  amount: number,
  datetime: string
}

export interface CTRequest {
  requestID: number,
  terminate: boolean,
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
  }
  userID: number,
}

export interface Caretaker {
  userID: number,
  username: string,
  lastName: string,
  firstName: string,
  phoneNumber: string,
  postalAddress: string,
  email: string
}

/**
 * Interfaces for passing information to assignment subcomponent
 */
export interface requestInformation {
  enabled: Array<boolean>,
  checked: Array<boolean>,
  id: number,
  isFlex: boolean,
  isPastPicker: boolean,
  pID: number,
  scheduleId: number,
  start: string,
  end: string
}

  