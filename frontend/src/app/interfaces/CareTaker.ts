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
    firstName: string,
    lastName: string,
    postalAddress: string,
    email: string,
    phoneNumber: string,
    userID: string,
    username: string
  }
  