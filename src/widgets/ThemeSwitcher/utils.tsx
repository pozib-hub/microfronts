import React from 'react'

import { Theme } from 'src/app/providers/ThemeProvider'
import IconDark from 'src/shared/assets/icons/theme-dark.svg'
import IconLight from 'src/shared/assets/icons/theme-light.svg'

export const getIconByTheme = (theme?: Theme) => {
    switch (theme) {
        case Theme.DARK:
            return IconDark
        case Theme.LIGHT:
            return IconLight
        default:
            return IconLight
    }
}
export const getInversionIconByTheme = (theme?: Theme) => {
    switch (theme) {
        case Theme.DARK:
            return IconLight
        case Theme.LIGHT:
            return IconDark
        default:
            return IconLight
    }
}

