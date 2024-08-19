import { createContext, Dispatch, SetStateAction } from 'react'

export enum Theme {
  LIGHT = 'light_theme',
  DARK = 'dark_theme',
  ORANGE = 'orange_theme',
}
export interface IThemeProps {
  theme?: Theme;
  setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeProps>({})

export const KEY_THEME_BROWSER_STORAGE = 'THEME'
