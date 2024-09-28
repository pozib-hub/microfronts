import React from 'react'
import { Icon } from '@shared/ui/Icon/Icon'

import { Theme } from '@app/providers/ThemeProvider'
// import IconDark from 'src/shared/assets/icons/theme-dark.svg'
// import IconLight from 'src/shared/assets/icons/theme-light.svg'
// import IconOrange from 'src/shared/assets/icons/theme-orange.svg'

export const getIconByTheme = (theme?: Theme) => {
    switch (theme) {
        case Theme.DARK:
            return <Icon id='ThemeDark' />
        case Theme.LIGHT:
            return <Icon id='ThemeLight' />
        case Theme.ORANGE:
            return <Icon id='ThemeOrange' />
        default:
            return <Icon id='ThemeLight' />
    }
}
export const getInversionIconByTheme = (theme?: Theme) => {
    switch (theme) {
        case Theme.DARK:
            return <Icon id='ThemeLight' />
        case Theme.LIGHT:
            return <Icon id='ThemeDark' />
        case Theme.ORANGE:
            return <Icon id='ThemeOrange' />
        default:
            return <Icon id='ThemeLight' />
    }
}

