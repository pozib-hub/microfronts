
interface IAddress {
    street?: string;
    city?: string;
    zip?: string;
}

export interface IProfile {
    username?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    address?: IAddress;
    hobbies?: string[];
    avatar?: string;
}

export interface ProfileSchema {
    data?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    form?: IProfile
}