/**
 * Interface describing a single care taker request
 */

export interface Requirements {
  serviceType: string,
  daysRequested: Array<number>,
  startDate: string,
  endDate: string,
  [key: string]: any
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
  requirements: Requirements
}
  