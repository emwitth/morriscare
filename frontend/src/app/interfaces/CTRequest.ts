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
  serviceType: string,
  deleted: boolean,
  hcpID: number,
  userID: number,
  requirements: Requirements,
  distribution: {
    assigned: Array<AssignmentPair>,
    unassigned: Array<number>
  }
}

/**
 * Interfaces for passing information to assignment subcomponent
 */
export interface requestInformation {
  enabled: Array<boolean>,
  id: number,
  isFlex: boolean,
  start: string,
  end: string
}

  