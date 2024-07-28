import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import cn from 'src/shared/lib/classNames/classNames'

import style from './AppLink.module.scss'

type Themes = 'primary' | 'secondary'

interface IAppLinkProps extends LinkProps {
  theme?: Themes;
}

export const AppLink: FC<IAppLinkProps> = (props) => {
    const {
        className,
        children,
        theme = 'primary',
        ...otherProps
    } = props

    return (
        <Link
            className={cn(style.appLink, style[theme], className)}
            {...otherProps}
        >
            {children}
        </Link>
    )
}
