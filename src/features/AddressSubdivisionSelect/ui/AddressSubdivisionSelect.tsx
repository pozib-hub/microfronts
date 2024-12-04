import { GroupBase } from 'react-select'

import { AsyncSelect, AsyncSelectProps, TAdditional } from '@shared/ui/AsyncSelect'
import { IAddress } from '@shared/types/common'

import { fetchSubdivision } from '../model/api/fetchSubdivision'

interface IAddressSubdivisionSelectProps
    extends Omit<
        AsyncSelectProps<IAddress, GroupBase<IAddress>, TAdditional>,
        'getOptionLabel' | 'getOptionValue' | 'loadOptions' | 'value'
    > {
    className?: string
    subdivisionId: string
    value?: { id: string; name: string } | null
}

export const AddressSubdivisionSelect = (props: IAddressSubdivisionSelectProps) => {
    const { subdivisionId, value, ...otherProps } = props

    const onLoadAddresses = async () => {
        const subdivision = await fetchSubdivision(subdivisionId)

        return {
            options: subdivision?.addresses || [],
            hasMore: false,
        }
    }

    return (
        <AsyncSelect<IAddress, GroupBase<IAddress>, TAdditional>
            isSearchable={false}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            loadOptions={onLoadAddresses}
            variant="outline"
            value={value ? (value as IAddress) : undefined}
            {...otherProps}
        />
    )
}
