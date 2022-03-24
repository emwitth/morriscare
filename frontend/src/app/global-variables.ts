/**
 * Variable for Roles while logged in
 */
export const enum Roles {
    admin = 'admin',
    sm = 'staff',
    ct = 'ct',
    hcp = 'hcp'
};

/**
 * Variable for days while logged in
 */
export const enum DAYS {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
}

/**
 * These are the choices for hiring requirement dropdowns
 */
export const HIRING_REQUIREMENTS: Array<string> = [
    "Test qualification",
    "Another qualification",
    "A very qualified individual"
];

/**
 * These are the choices for hiring education dropdowns
 */
 export const HIRING_EDUCATION: Array<string> = [
    "Bachelor's",
    "Master's",
    "Doctorate",
    "Other"
];