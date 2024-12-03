import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import ThemeProvider from './ThemeProvider'

export const WithTheme = (Component: React.ComponentType) => {
    return () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const theme = useAppSelector((state) => state.userSettings.theme)

        return <ThemeProvider initialTheme={theme}>{<Component />}</ThemeProvider>
    }
}
