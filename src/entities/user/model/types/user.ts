export interface IUser {
    id: string
    username: string
    avatar?: string
}

export interface UserSchema {
    authData?: IUser

    _inited?: boolean
}
