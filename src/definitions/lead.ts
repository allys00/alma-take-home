
export type Lead = {
    id: number
    name: string
    status: LEAD_STATUS
    country: string
    submittedAt?: string
}

export enum LEAD_STATUS {
    PENDING = "PENDING",
    REACHED_OUT = "REACHED_OUT",
}

export const LEAD_STATUS_LABELS = {
    [LEAD_STATUS.PENDING]: "Pending",
    [LEAD_STATUS.REACHED_OUT]: "Reached Out",
}
