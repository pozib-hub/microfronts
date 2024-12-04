export interface IProfile {
    id: string
    username: string
    firstname?: string
    lastname?: string
    age?: number
    hobbies?: string[]
    avatar?: string
    subdivision: {
        id: string
        name: string
    } | null
    address: {
        id: string
        name: string
    } | null
}
