import React, { Suspense } from 'react'

import cn from 'shared/lib/classNames/classNames'
import { AppRouter } from 'src/app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { PageLoader } from 'widgets/PageLoader'



// TODO:
// 1. сделать приттер на пре-коммит
// 2. на линтер поставить правило на сортировку импортов
// 4. научись делать снипиты для создания компонентов
// 5. попробовать всем классам в сервере сделать контекст с бд
// 6. сделать автоматическую типизацию по серверу


const App = () => {

    return (
        <div className={cn('app')}>
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
