import { ReactNode } from 'react'

import { $api } from '@shared/api/api'
import { userActions } from '@entities/user'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'

const UNAUTHORIZED = 401

interface ICheckAuthProviderProps {
    children?: ReactNode
}

export const CheckAuthProvider = (props: ICheckAuthProviderProps) => {
    const { children } = props

    const dispatch = useAppDispatch()

    $api.interceptors.response.use(
        (response) => response,
        (error) => {
            const { status } = error.response
            if (status === UNAUTHORIZED) {
                dispatch(userActions.logout())
            }
            return Promise.reject(error)
        },
    )

    return children
}
