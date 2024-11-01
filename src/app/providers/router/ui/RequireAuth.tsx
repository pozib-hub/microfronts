import { ReactNode, FC } from "react"
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from "@shared/lib/hooks/useAppSelector"

import { routePath } from '@shared/const/router'


interface IRequireAuthProps {
    children: ReactNode
}

const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
    const isAuth = useAppSelector(state => state.user.authData)
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to={routePath.main} replace state={{ from: location }} />
    }

    return children
}

export default RequireAuth