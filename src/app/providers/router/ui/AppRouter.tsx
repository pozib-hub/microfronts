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
            // {...route}

            element={
                route.authOnly
                    ? <RequireAuth>{element}</RequireAuth>
                    : element
            } />
    }, [])

    return <>
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routeConfig.map(route => route.children?.length
                    ? route.children.map(renderWithWrapper)
                    : renderWithWrapper(route))}
            </Routes>
        </Suspense>
    </>
}

export default memo(AppRouter)
