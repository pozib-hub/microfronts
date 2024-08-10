
export interface IUser {
    username: string
    password: string
}

export type DB = {
    users: IUser[]
}
