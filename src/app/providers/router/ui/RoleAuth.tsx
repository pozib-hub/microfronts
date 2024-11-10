import { ReactNode, FC, useMemo } from "react"
import { Navigate, useLocation } from 'react-router-dom'
import intersection from "lodash/intersection"

import { useAppSelector } from "@shared/lib/hooks/useAppSelector"

import { routePath } from '@shared/const/router'
import { getUserRoles, UserRole } from "@entities/user"


interface IRoleAuthProps {
    children: ReactNode
    roles: UserRole[]
}

const RoleAuth: FC<IRoleAuthProps> = ({ children, roles }) => {
    const userRoles = useAppSelector(getUserRoles)
    const location = useLocation()

    const hasRequiredRoles = useMemo(() => {
        const setRoles = roles

        return intersection(setRoles, userRoles).length !== 0
    }, [roles, userRoles])

    if (!hasRequiredRoles) {
        return <Navigate to={routePath.forbidden} replace state={{ from: location }} />
    }

    return children
}

export default RoleAuth