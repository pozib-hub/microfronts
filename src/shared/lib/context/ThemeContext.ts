import { createContext, Dispatch, SetStateAction } from 'react'
import { Theme } from '../../const/them'

export interface IThemeProps {
  theme?: Theme;
  setTheme?: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeProps>({})
