import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
    test('Button text', () => {
        render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    test('Button theme transparent', () => {
        render(<Button theme="transparent">Test</Button>)
        expect(screen.getByText('Test')).toHaveClass('transparent')
    })
})
