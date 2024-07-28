import React from 'react'

import { Theme } from 'src/app/providers/ThemeProvider'
import IconDark from 'src/shared/assets/icons/theme-dark.svg'
import IconLight from 'src/shared/assets/icons/theme-light.svg'

export const iconByTheme: Record<string, React.ReactNode> = {
    [Theme.DARK]: <IconDark />,
    [Theme.LIGHT]: <IconLight />,
}

export const inversionIconByTheme: Record<string, React.ReactNode> = {
    [Theme.DARK]: <IconLight />,
    [Theme.LIGHT]: <IconDark />,
}
