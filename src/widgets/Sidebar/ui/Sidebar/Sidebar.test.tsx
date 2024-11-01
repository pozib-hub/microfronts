import { fireEvent, screen } from '@testing-library/react'

import componentRender from '@shared/lib/tests/componentRender/componentRender'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
    test('Sidebar getByTestId sidebar', () => {
        componentRender(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('Sidebar open to close', () => {
        componentRender(<Sidebar />)
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
