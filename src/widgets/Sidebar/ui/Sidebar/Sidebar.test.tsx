import { fireEvent, render, screen } from '@testing-library/react'

import renderWithTranslation from 'src/shared/lib/tests/renderWithTranslation/renderWithTranslation'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
    test('Sidebar getByTestId sidebar', () => {
        renderWithTranslation(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('Sidebar open to close', () => {
        renderWithTranslation(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar')).toHaveClass('open')
    })

    // withTranslation()

    // test('Sidebar getByTestId sidebar', () => {
    //     render(<Sidebar />)
    //     expect(screen.getByTestId('sidebar')).toHaveClass('transparent')
    // })
})
