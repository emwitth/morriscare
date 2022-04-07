/**
 * Interface discribing a schedule an HCP would be using
 */

// interfaces to discribe json coming from the backend
export interface hcpSchedule {
    [key: number]: Array<assignment>
}

export interface assignment {
    startDate: string,
    startTime: string,
    endTime: string,
    numDaysRequested: number,
    daysRequested: Array<number>
}



//  "schedule": {
//     "4": [
//         {
//             "startDate": "2022-04-03",
//             "startTime": "16:00",
//             "endTime": "18:00",
//             "numDaysRequested": 8,
//             "daysRequested": [
//                 2,
//                 4
//             ]
//         }
//     ],
//     "6": [
//         {
//             "startDate": "2022-05-01",
//             "startTime": "16:00",
//             "endTime": "18:00",
//             "numDaysRequested": 4,
//             "daysRequested": [
//                 2,
//                 4
//             ]
//         }
//     ],
//     "2": [
//         {
//             "startDate": "2022-04-04",
//             "startTime": "06:00",
//             "endTime": "16:00",
//             "numDaysRequested": 3,
//             "daysRequested": [
//                 1,
//                 5
//             ]
//         }
//     ]
// },