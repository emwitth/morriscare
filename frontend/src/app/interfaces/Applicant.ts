/**
 * Interface describing a single applicant
 */
export interface Applicant {
  pID: number,
  firstName: string,
  lastName: string,
  sex: string,
  ssn: string,
  typeHS: string,
  qualification: string,
  qualificationDate: string,
  yearOExp: number,
  phoneNumber: string,
  postalAddress: string,
  email: string,
  enroll: boolean,
  deleted: boolean,
  advertiseID: number,
  userID: number
}
  