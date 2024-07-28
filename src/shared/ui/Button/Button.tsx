import React, { ButtonHTMLAttributes, FC } from 'react'

import cn from 'shared/lib/classNames/classNames'

import style from './Button.module.scss'

type Themes = 'transparent' | 'outline'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Themes
}

export const Button: FC<IButtonProps> = (props) => {
    const {
        className,
        children,
        theme = 'transparent',
        ...otherProps
    } = props

    return (
        <button
            type="button"
            className={cn(style.button, style[theme], className)}
            {...otherProps}
        >
            {children}
        </button>
    )
}
