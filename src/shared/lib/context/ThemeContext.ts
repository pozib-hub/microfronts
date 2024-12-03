import { createContext } from 'react'
import { Theme } from '../../const/theme'

export interface IThemeProps {
    theme?: Theme
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<IThemeProps>({})
