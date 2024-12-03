import { rtkApi } from '@shared/api/rtkApi'
import { ISubdivision } from '../model/types/subdivision'

interface IGetProps {
    id: string
}

interface IGetListProps {
    search?: string
    page: number
    limit: number
}

type IGetListReturn = {
    hasMore: boolean
    totalCount: number
    data: ISubdivision[]
}

type IPutProps = {
    form: ISubdivision
}

type IPutReturn = {
    data: ISubdivision
}

type ICreateProps = {
    form: ISubdivision
}

type ICreateReturn = {
    data: ISubdivision
}

type IDeleteReturn = {
    status: string
}

const subdivisionApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubdivision: builder.query<ISubdivision | null, IGetProps>({
            query: ({ id }) => ({ url: `/subdivisions/` + id }),
        }),
        getSubdivisions: builder.query<IGetListReturn, IGetListProps>({
            query: (props) => ({ url: `/subdivisions`, params: props }),
        }),
        editSubdivision: builder.mutation<IPutReturn, IPutProps>({
            query: (props) => ({
                url: `/subdivisions`,
                method: 'PUT',
                body: {
                    value: props.form,
                },
            }),
        }),
        createSubdivision: builder.mutation<ICreateReturn, ICreateProps>({
            query: (props) => ({
                url: `/subdivisions`,
                method: 'POST',
                body: {
                    value: props.form,
                },
            }),
        }),
        deleteSubdivision: builder.mutation<IDeleteReturn, IGetProps>({
            query: ({ id }) => ({
                url: `/subdivisions/` + id,
                method: 'DELETE',
            }),
        }),
    }),
})

export const useSubdivision = subdivisionApi.useGetSubdivisionQuery
export const useSubdivisions = subdivisionApi.useGetSubdivisionsQuery
export const useEditSubdivision = subdivisionApi.useEditSubdivisionMutation
export const useCreateSubdivision = subdivisionApi.useCreateSubdivisionMutation
export const useDeleteSubdivision = subdivisionApi.useDeleteSubdivisionMutation
