import { IProfile } from "@entities/profile"
import { ValidateProfileError } from "../const/const"

export interface EditableProfileSchema {
    data?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    form?: IProfile
    validateErrors?: ValidateProfileError[];
}

