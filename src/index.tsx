import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider'
import { ErrorBoundary } from './app/providers/ErrorBoundary'

import 'shared/config/i18n/i18n'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

const Index = (
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>
)

root.render(Index)
