export interface IAddress {
    street: string;
    city: string;
    zip: string;
}

export interface IProfile {
    firstname: string;
    lastname: string;
    age: string;
    address: IAddress;
    hobbies: string[];
    avatar: null;
}

export interface IUser {
    id: string
    username: string
    password: string
}

export type DB = {
    profile: IProfile;
    users: IUser[]
}



