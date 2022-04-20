export interface BillingAccount {
    billingAccount: number,
    requestID: number,
    detail: Array<Detail>,
    total: number,
    paidTotal: number,
    unPaidTotal: number,
    patientName: string
}

export interface Detail {
    hcpName: string,
    pID: number,
    records: Array<Record>
}

export interface Record {
    workDate: string,
    startTime: string,
    endTime: string,
    amount: number
}