import React, { ButtonHTMLAttributes, FC } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Button.module.scss'

type Variants = 'primary' | 'dashed' | 'transparent' | 'outline' | "danger"
type Sizes = 'small' | 'medium' | 'large'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variants
    size?: Sizes
    isLoading?: boolean
}

export const Button: FC<IButtonProps> = (props) => {
    const {
        className,
        children,
        variant = 'primary',
        size = 'medium',
        isLoading,
        ...buttonProps
    } = props

    const classes = [
        styles.button,
        {
            [styles.disabled]: buttonProps.disabled,
            [styles.loading]: isLoading,
        },
        styles[variant],
        styles[size],
        className,
    ]

    return (
        <button
            data-testid="button"
            type="button"
            {...buttonProps}
            className={cn(classes)}
        >
            {isLoading && <div className={styles.loader} ><div /></div>}
            <div className={cn(styles.content)}>
                {children}
            </div>
        </button>
    )
}
