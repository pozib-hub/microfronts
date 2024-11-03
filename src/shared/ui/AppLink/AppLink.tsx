import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'

import styles from './AppLink.module.scss'

type Variants = 'primary' | 'secondary'

interface IAppLinkProps extends LinkProps {
    variant?: Variants;
    disabled?: boolean
}

export const AppLink: FC<IAppLinkProps> = (props) => {
    const {
        className,
        children,
        variant = 'primary',
        disabled,
        ...otherProps
    } = props

    const classes = [
        styles.appLink,
        {
            [styles.disabled]: disabled,
        },
        styles[variant],
        className,
    ]

    return (
        <Link
            className={cn(classes)}
            {...otherProps}
        >
            {children}
        </Link>
    )
}
