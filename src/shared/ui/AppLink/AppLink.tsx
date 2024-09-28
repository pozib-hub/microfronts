import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'

import style from './AppLink.module.scss'

type Variants = 'primary' | 'secondary'

interface IAppLinkProps extends LinkProps {
    variant?: Variants;
}

export const AppLink: FC<IAppLinkProps> = (props) => {
    const {
        className,
        children,
        variant = 'primary',
        ...otherProps
    } = props

    return (
        <Link
            className={cn(style.appLink, style[variant], className)}
            {...otherProps}
        >
            {children}
        </Link>
    )
}
