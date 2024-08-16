import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

interface IOptions {
    initialRoute: string
}

const renderWithRouter = (component: React.ReactNode, options: IOptions) => {
    const { initialRoute } = options

    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            {component}
        </MemoryRouter>,
    )
}
export default renderWithRouter
