import React, { HTMLAttributes, FC, CSSProperties } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Text.module.scss'

type Variants = 'span' | 'p' | 'h1' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type Sizes = 'small' | 'medium' | 'large'
type Colors = 'primary' | 'secondary' | 'red' | 'white'

interface ITextProps extends HTMLAttributes<HTMLSpanElement> {
    disabled?: boolean
    bold?: boolean
    variant?: Variants
    size?: Sizes,
    color?: Colors,
    ellipsis?: boolean | {
        lines?: number,
        width: string | number,
    }
    children?: React.ReactNode
    "data-testid"?: string
}

export const Text: FC<ITextProps> = (props) => {
    const {
        className,
        children,
        variant = 'span',
        size = 'medium',
        color,
        disabled,
        bold,
        ellipsis,
        style,

        "data-testid": dataTestId = ""
    } = props

    const classes = [
        styles.Text,
        {
            [styles.disabled]: disabled,
            [styles.bold]: bold,
        },
        styles[color || ""],
        styles[variant],
        styles[size],
        className,
    ]

    const ellipsis_style: CSSProperties = {}

    if (typeof ellipsis === 'boolean') {
        ellipsis_style.display = 'inline-block'
        ellipsis_style.overflow = 'hidden'
        ellipsis_style.whiteSpace = 'nowrap'
        ellipsis_style.textOverflow = 'ellipsis'
    }

    if (typeof ellipsis === 'object') {
        ellipsis_style.display = '-webkit-box'
        ellipsis_style.WebkitBoxOrient = 'vertical'
        ellipsis_style.overflow = 'hidden'
        ellipsis_style.WebkitLineClamp = ellipsis.lines || 1
        ellipsis_style.width = ellipsis.width
    }

    const inline_style = {
        ...ellipsis_style,
        ...style,
    }

    return React.createElement<HTMLAttributes<HTMLSpanElement>>(
        variant,
        { ...props, className: cn(classes), style: inline_style },
        children,
    )
}
