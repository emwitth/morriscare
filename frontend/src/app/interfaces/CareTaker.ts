/**
 * Interface describing a single care taker
 */

export interface UnappCareTaker {
  firstName: string,
  lastName: string,
  postalAddress: string,
  email: string,
  phoneNumber: string,
  takerID: string,
  enroll: string
}

export interface CareTaker {
  userID: number,
  username: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
  postalAddress: string,
  email: string,
  role: CTRole
}
  
export interface CTRole {
  type: string,
  takerID: number
}