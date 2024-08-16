import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import cn from 'shared/lib/classNames/classNames'
import { AppRouter } from 'src/app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { PageLoader } from 'widgets/PageLoader'
import { userActions } from 'entities/user'


// TODO:
// 1. сделать приттер на пре-коммит
// 2. на линтер поставить правило на сортировку импортов
// 4. научись делать снипиты для создания компонентов
// 5. попробовать всем классам в сервере сделать контекст с бд
// 6. сделать автоматическую типизацию по серверу
// 7. семантическая  верстка


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={cn('app')}>
            <Suspense fallback={<PageLoader />}>
                <Navbar />
                <Sidebar />
                <div className="layout">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
