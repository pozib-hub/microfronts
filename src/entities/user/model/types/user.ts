import { UserRole } from "../consts/consts"

export interface IUser {
    id: string
    username: string
    avatar?: string
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: IUser

    _inited?: boolean
}
