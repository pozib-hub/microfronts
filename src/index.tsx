import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { StoreProvider } from '@app/providers/StoreProvider'
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider'
import { ErrorBoundary } from './app/providers/ErrorBoundary'
import App from './app/App'

import '@shared/config/i18n/i18n'

import './app/app.scss'
import './app/styles/index.scss'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript

const Index = (
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
)

root.render(Index)
