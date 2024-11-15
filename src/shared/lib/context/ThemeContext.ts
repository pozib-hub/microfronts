import { createContext, Dispatch, SetStateAction } from 'react'
import { Theme } from '../../const/them'

export interface IThemeProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeProps>({})
