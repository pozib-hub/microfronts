export interface IAddress {
    id: string
    name: string
    workSchedule: {
        startWork: string
        finishWork: string
        startBreak: string
        finishBreak: string
    }
}
