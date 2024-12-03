import { IAddress } from '@shared/types/common'

export interface ISubdivision {
    id: string
    name: string
    defaultAddressId: string
    defaultAddressName: string
    addresses: IAddress[]
}
