import React, { Suspense } from 'react'

import cn from 'shared/lib/classNames/classNames'
import { AppRouter } from 'src/app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { PageLoader } from 'widgets/PageLoader'

import useTheme from './providers/ThemeProvider/lib/useTheme'

import './index.scss'
import './styles/index.scss'

// TODO:
// 1. сделать приттер на пре-коммит
// 2. на линтер поставить правило на сортировку импортов
// 4. научись делать снипиты для создания компонентов

const App = () => {
    const { theme } = useTheme()

    return (
        <div className={cn('app', theme)}>
            <Suspense fallback={<PageLoader />}>
                <Navbar />
                <Sidebar />
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
