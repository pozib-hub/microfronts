import { ISubdivision } from '@entities/Subdivision'
import { $api } from '@shared/api/api'

export const fetchSubdivision = async (id: string) => {
    try {
        const { data } = await $api.get<ISubdivision>('/subdivisions/' + id)
        return data
    } catch (error) {
        return null
    }
}
