
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