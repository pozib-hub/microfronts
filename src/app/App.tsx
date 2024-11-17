import React, { Suspense, useEffect } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Navbar } from '@widgets/Navbar'
import { Sidebar } from '@widgets/Sidebar'
import { PageLoader } from '@widgets/PageLoader'
import { me } from '@entities/user'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { ToggleFeatures } from '@shared/lib/features'

import { AppRouter } from './providers/router'
import { MainLayout } from '@shared/layouts/MainLayout'

// TODO:
// 1. сделать приттер на пре-коммит
// 2. на линтер поставить правило на сортировку импортов
// 4. научись делать снипиты для создания компонентов
// 5. попробовать всем классам в сервере сделать контекст с бд
// 6. сделать автоматическую типизацию по серверу
// 7. семантическая  верстка
// 8. свой json server
// 9. авторизация по сертификату

const App = () => {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) => state.user.isLoading)

    useEffect(() => {
        dispatch(me())
    }, [dispatch])

    return (
        <ToggleFeatures
            name="isAppRedesigned"
            on={
                <div className={cn('app_redesigned')}>
                    <Suspense fallback={<PageLoader />}>
                        <MainLayout
                            header={<Navbar />}
                            content={isLoading ? <PageLoader /> : <AppRouter />}
                            sidebar={<Sidebar />}
                        />
                        {/* <main id="scroll-layout">{isLoading ? <PageLoader /> : <AppRouter />}</main> */}
                    </Suspense>
                </div>
            }
            off={
                <div className={cn('app')}>
                    <Suspense fallback={<PageLoader />}>
                        <Navbar />
                        <Sidebar />
                        <main id="scroll-layout">{isLoading ? <PageLoader /> : <AppRouter />}</main>
                    </Suspense>
                </div>
            }
        />
    )
}

export default App
