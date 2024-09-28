import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

type DivProps = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>

const justifyClasses: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
}

const alignClasses: Record<FlexAlign, string> = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
}

const directionClasses: Record<FlexDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
}

const gapClasses: Record<FlexGap, string> = {
    4: styles.gap4,
    8: styles.gap8,
    16: styles.gap16,
    32: styles.gap32,
}

const paddingClasses: Record<FlexGap, string> = {
    4: styles.padding4,
    8: styles.padding8,
    16: styles.padding16,
    32: styles.padding32,
}

export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    gap?: FlexGap;
    padding?: FlexGap
    max?: boolean;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        padding,
        max,
    } = props

    const classes = [
        styles.flex,
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
        padding && paddingClasses[padding]
    ]

    const mods = {
        [styles.max]: max,
    }

    return (
        <div className={cn(classes, mods)}>
            {children}
        </div>
    )
}
