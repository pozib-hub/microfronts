import React, { memo } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
// import AppSvg from '@/shared/assets/icons/app-image.svg'

import { HStack } from '../Stack'

import styles from './AppLogo.module.scss'
import { Icon } from '../Icon/Icon'

interface AppLogoProps {
    className?: string
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
    return (
        <HStack max justify="center" className={classNames(styles.wrapper, className)}>
            <div className={styles.gradientBig} />
            <div className={styles.gradientSmall} />
            <Icon id="AppImage" />
        </HStack>
    )
})
