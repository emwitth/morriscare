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
 * Variable for days while logged in
 */
export const enum HCP_TYPE {
    nurse,
    physiotherapist,
    psychiatrist
}

/**
 * Variable for consistency in labels and no more mistakes
 */
export const HCP_LABELS = {
    nurse: {type: HCP_TYPE.nurse, label: "nurse"},
    physiotherapist: {type: HCP_TYPE.physiotherapist, label: "physiotherapist"},
    psychiatrist: {type: HCP_TYPE.psychiatrist, label: "psychiatrist"}
}

/**
 * These are the choices for hiring requirement dropdowns
 */
export const HIRING_REQUIREMENTS: Array<string> = [
    "Willing to carry a flexible schedule",
    "Experience doing research at a accredited university",
    "Background with elderly patients",
    "Background with children",
    "Is fluent in Spanish",
    "Can handle multiple patients at once",
    "I have no qualifications, don't hire me!"
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