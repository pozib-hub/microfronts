import { GroupBase, OptionsOrGroups } from 'react-select'

import { AsyncSelect, AsyncSelectProps, TAdditional } from '@shared/ui/AsyncSelect'
import { ISubdivision } from '@entities/Subdivision'

import { fetchSubdivisions } from '../model/api/fetchSubdivisions'

interface ISubdivisionSelectProps
    extends Omit<
        AsyncSelectProps<ISubdivision, GroupBase<ISubdivision>, TAdditional>,
        'getOptionLabel' | 'getOptionValue' | 'loadOptions' | 'value'
    > {
    className?: string
    value?: { id: string; name: string } | null
}

export const SubdivisionSelect = (props: ISubdivisionSelectProps) => {
    const { value, ...otherProps } = props

    const onLoadSubdivisions = async (
        search: string,
        options: OptionsOrGroups<ISubdivision, GroupBase<ISubdivision>>,
    ) => {
        const { data, hasMore } = await fetchSubdivisions(search, {
            offset: options.length,
            limit: 10,
        })

        return {
            options: data,
            hasMore: hasMore,
        }
    }

    return (
        <AsyncSelect<ISubdivision, GroupBase<ISubdivision>, TAdditional>
            value={value ? (value as ISubdivision) : undefined}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            loadOptions={onLoadSubdivisions}
            variant="outline"
            {...otherProps}
        />
    )
}
