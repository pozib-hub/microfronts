import { createContext, Dispatch, SetStateAction } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
export interface IThemeProps {
  theme?: Theme;
  setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeProps>({})

export const KEY_THEME_BROWSER_STORAGE = 'THEME'
