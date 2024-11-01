import { UserRole } from "@entities/user"
import { RouteProps } from "react-router-dom"


export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}
