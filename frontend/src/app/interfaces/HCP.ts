import { hcpSchedule } from "./HCP-Schedule"
/**
 * Interface describing a single health care professional
 */

export interface hcpApplicant {
  pID: number,
  firstName: string,
  lastName: string,
  sex: string,
  ssn: string,
  salary: number,
  typeHS: string,
  qualification: string,
  qualificationDate: string,
  yearOExp: number,
  phoneNumber: string,
  postalAddress: string,
  dateOfBirth: string,
  email: string,
  enroll: boolean,
  schedule: hcpSchedule,
  deleted: boolean,
  advertiseID: number,
  userID: number
}

export interface HCP {
  userID: string,
  username: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
  postalAddress: string,
  email: string,
  role: hcpRole
}

export interface hcpRole {
  type: string,
  takerID: number
}