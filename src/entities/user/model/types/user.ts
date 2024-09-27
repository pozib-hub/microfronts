
export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface IUser {
    id: string
    username: string
    avatar?: string
    roles?: Set<UserRole>
}

export interface UserSchema {
    authData?: IUser

    _inited?: boolean
}
