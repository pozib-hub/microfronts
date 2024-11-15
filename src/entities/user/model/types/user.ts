import { IFeaturesFlags } from '@shared/types/featuresFlags'
import { UserRole } from "../consts/consts"

export interface IUser {
    id: string
    username: string
    avatar?: string
    roles?: UserRole[]
    features?: IFeaturesFlags
}

export interface UserSchema {
    authData?: IUser

    _inited?: boolean
}
