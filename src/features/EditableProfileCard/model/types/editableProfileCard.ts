import { IProfile } from "entities/profile"

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_CITY = 'INCORRECT_CITY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface EditableProfileSchema {
    data?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    form?: IProfile
    validateErrors?: ValidateProfileError[];
}

