import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { I18nextProvider } from 'react-i18next'

import i18nForTests from 'src/shared/config/i18n/i18nForTests'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { ReducersMapObject } from '@reduxjs/toolkit'

interface IOptions {
    initialRoute?: string
    initialState?: PartialDeep<StateSchema>
    asyncReducers?: PartialDeep<ReducersMapObject<StateSchema>>;
}

const defaultOptions: IOptions = {
    initialRoute: "",
}

const componentRender = (component: React.ReactNode, options: IOptions = defaultOptions) => {
    const {
        initialRoute = '',
        initialState,
        asyncReducers,
    } = options

    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
            ,
        </MemoryRouter>,
    )
}
export default componentRender
