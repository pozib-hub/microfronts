import React, { Suspense, useMemo, memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { PageLoader } from 'src/widgets/PageLoader'

import { routeConfig } from 'src/shared/config/routerConfig/routerConfig'

const AppRouter = () => {
    const isAuth = useAppSelector(state => state.user.authData)

    const routes = useMemo(() => {
        return routeConfig.filter(route => !(route.authOnly && !isAuth))
    }, [isAuth])

    return <>
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <>
                    {routes.map((route) => (
                        <Route key={route.path} {...route} />
                    ))}
                </>
            </Routes>
        </Suspense>
    </>
}

export default memo(AppRouter)
