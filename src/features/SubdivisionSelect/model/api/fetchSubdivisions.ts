import { $api } from '@shared/api/api'
import { ISubdivision } from '@entities/Subdivision'

export const fetchSubdivisions = async (
    search: string,
    params: {
        offset: number
        limit: number
    },
) => {
    try {
        const _params = {
            search,
            ...params,
        }

        const { data } = await $api.get<{
            data: ISubdivision[]
            hasMore: boolean
        }>('/subdivisions', {
            params: _params,
        })
        return data
    } catch (error) {
        return {
            data: [],
            hasMore: false,
        }
    }
}
