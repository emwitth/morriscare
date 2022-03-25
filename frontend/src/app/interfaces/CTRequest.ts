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

export interface AssignmentPair {
  pID: number,
  days: Array<number>
}

export interface CTRequest {
  requestID: number,
  patientFirstName: string,
  patientLastName: string,
  sex: string,
  dateOfBirth: string,
  locationOfService: string,
  patientPhoneNumber: string,
  patientEmail: string,
  deleted: boolean,
  userID: number,
  requirements: Requirements,
  distribution: {
    assigned: Array<AssignmentPair>,
    unassigned: Array<number>
  }
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
  start: string,
  end: string
}

  