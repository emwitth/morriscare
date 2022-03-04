/**
 * Interface describing a single applicant
 */
//{ firstName, lastName, email, sex, phoneNumber, address, dateOfBirth, ssn, yearsOfEExperience, qualifications }
export interface Applicant {
  firstName: string,
  lastName: string,
  email: string,
  sex: string,
  phoneNumber: string,
  address: string,
  dateOfBirth: string,
  ssn: string,
  yearsOfExperience: string,
  qualifications: string,
  id: number
}
  