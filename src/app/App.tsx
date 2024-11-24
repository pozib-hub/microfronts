import React, { Suspense, useEffect } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Navbar } from '@widgets/Navbar'
import { Sidebar } from '@widgets/Sidebar'
import { PageLoader } from '@widgets/PageLoader'
import { me } from '@entities/user'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { MainLayout } from '@shared/layouts/MainLayout'
import { AppLoaderLayout } from '@shared/layouts/AppLoaderLayout'

import { AppRouter } from './providers/router'
import { useAppToolbar } from './lib/useAppToolbar'
import { WithTheme } from './providers/ThemeProvider/ui/WithTheme'

// TODO:
// 2. на линтер поставить правило на сортировку импортов
// 5. попробовать всем классам в сервере сделать контекст с бд
// 6. сделать автоматическую типизацию по серверу
// 8. свой json server
// 9. авторизация по сертификату

// TODO двойной запрос при выборе тематики статей
// перенести фильтры статей в drawer в мбоильной версии

const App = () => {
    const dispatch = useAppDispatch()

    const toolbar = useAppToolbar()

    const isLoading = useAppSelector((state) => state.user.isLoading)

    useEffect(() => {
        dispatch(me())
    }, [dispatch])

    if (isLoading) {
        return (
            <div className="app" id="scroll-layout">
                <AppLoaderLayout />
            </div>
        )
    }

    return (
        <div className="app" id="scroll-layout">
            <Suspense fallback={<PageLoader />}>
                <MainLayout
                    sidebar={<Sidebar />}
                    content={<AppRouter />}
                    rightNavbar={<Navbar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    )
}

export default WithTheme(App)
