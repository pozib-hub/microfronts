import React, { Suspense, memo, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageLoader } from '@widgets/PageLoader'
import { AppRoutesProps, routeConfig } from '@shared/config/routerConfig/routerConfig'

import RequireAuth from './RequireAuth'
import RoleAuth from './RoleAuth'

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const baseElement = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        )
        const CheckRoles = route.roles
            ? <RoleAuth roles={route.roles}>{baseElement}</RoleAuth>
            : baseElement

        const CheckAuth = route.authOnly
            ? <RequireAuth>{CheckRoles}</RequireAuth>
            : baseElement

        const RouteElement = CheckAuth

        return <Route
            key={route.path}
            {...route}
            element={RouteElement} />
    }, [])

    return <>
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routeConfig.map(renderWithWrapper)}
            </Routes>
        </Suspense>
    </>
}

export default memo(AppRouter)

// const renderRouter = (routeConfig: AppRoutesProps[]): JSX.Element[] => {
//     return routeConfig.map(route => {
//         if (route.children) {
//             // Создаем родительский маршрут с логикой
//             const Parent = renderWithWrapper(route)

//             // Клонируем родительский элемент и добавляем к нему дочерние маршруты
//             return React.cloneElement(
//                 Parent,
//                 { key: route.path },
//                 renderRouter(route.children) // Дочерние маршруты
//             )
//         } else {
//             return renderWithWrapper(route)
//         }
//     })
// }
