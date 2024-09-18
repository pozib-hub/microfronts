import React, { Suspense, memo, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageLoader } from 'src/widgets/PageLoader'

import { AppRoutesProps, routeConfig } from 'src/shared/config/routerConfig/routerConfig'
import RequireAuth from './RequireAuth'

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        )

        return <Route
            key={route.path}
            {...route}
            element={
                route.authOnly
                    ? <RequireAuth>{element}</RequireAuth>
                    : element
            } />
    }, [])

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

    return <>
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routeConfig.map(renderWithWrapper)}
            </Routes>
        </Suspense>
    </>
}

export default memo(AppRouter)
