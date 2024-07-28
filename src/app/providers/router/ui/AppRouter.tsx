import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { routeConfig } from 'src/shared/config/routerConfig/routerConfig'
import { PageLoader } from 'src/widgets/PageLoader'

const AppRouter = () => (
    <div className="page-wrapper">
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routeConfig.map((route) => (
                    <Route key={route.path} {...route} />
                ))}
            </Routes>
        </Suspense>
    </div>
)

export default AppRouter
