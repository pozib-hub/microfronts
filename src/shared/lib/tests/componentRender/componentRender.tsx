import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { render } from '@testing-library/react'
import { ReducersMapObject } from '@reduxjs/toolkit'

import { StateSchema, StoreProvider } from '@app/providers/StoreProvider'
import { ThemeProvider } from '@app/providers/ThemeProvider'
import i18nForTests from '@shared/config/i18n/i18nForTests'
import { Theme } from '@shared/const/theme'

import '@app/styles/index.scss'

interface IOptions {
    initialRoute?: string
    initialState?: PartialDeep<StateSchema>
    initialTheme?: Theme
    asyncReducers?: PartialDeep<ReducersMapObject<StateSchema>>
}

const defaultOptions: IOptions = {
    initialRoute: '',
}

interface ITestProvider {
    children: ReactNode
    options?: IOptions
}

export function TestProvider(props: ITestProvider) {
    const { children, options = {} } = props

    const { initialRoute = '/', initialState, asyncReducers, initialTheme = Theme.LIGHT } = options

    return (
        <>
            <MemoryRouter initialEntries={[initialRoute]}>
                <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                    <I18nextProvider i18n={i18nForTests}>
                        <ThemeProvider initialTheme={initialTheme}>
                            <div className={`app ${initialTheme}`}>{children}</div>
                        </ThemeProvider>
                    </I18nextProvider>
                </StoreProvider>
            </MemoryRouter>
        </>
    )
}

const componentRender = (component: React.ReactNode, options: IOptions = defaultOptions) => {
    return render(<TestProvider options={options}>{component}</TestProvider>)
}

export default componentRender
