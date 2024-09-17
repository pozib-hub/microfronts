
interface IAddress {
    country?: string
    street?: string;
    city?: string;
    zip?: string;
}

export interface IProfile {
    id?: string
    username?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    address?: IAddress;
    hobbies?: string[];
    avatar?: string;
}

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_CITY = 'INCORRECT_CITY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}
export interface ProfileSchema {
    data?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    form?: IProfile
    validateErrors?: ValidateProfileError[];
}

