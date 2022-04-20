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
  typeHS: number,
  qualification: string,
  qualificationDate: string,
  yearOExp: number,
  phoneNumber: string,
  postalAddress: string,
  dateOfBirth: string,
  email: string,
  enroll: boolean,
  schedule: StupidSchedule,
  billingAccount: HCPBillingAccount,
  deleted: boolean,
  updateTime: string,
  advertiseID: number,
  userID: number
}

export interface StupidSchedule {
  [key: string]: any
}

export interface HCPBillingAccount {
  total: number,
  unPaidTotal: number,
  paidTotal: number,
  records: Array<HCPPaymentRecord>
}

export interface HCPPaymentRecord {
  amount: number,
  datetime: string
}

export interface HCP {
  userID: number,
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
  pID: number
}