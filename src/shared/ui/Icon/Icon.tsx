import { CSSProperties, useMemo, HTMLAttributes, FC } from 'react'
import cn from '@shared/lib/classNames/classNames'

import * as Icons from '../../assets/icons/svg'

import styles from './Icon.module.scss'

export type IconId = keyof typeof Icons

interface IProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    size?: number;
    id: IconId
    color?: CSSProperties["color"]
}

export const Icon: FC<IProps> = (props) => {
    const {
        id,
        className,
        size,
        color,
        ...divProps
    } = props


    const inlineStyles = useMemo<CSSProperties>(() => ({
        width: size || 25,
        height: size || 25,
        color: color || "currentcolor"
    }), [size, color])

    const IconById = Icons[id]

    if (!IconById) {
        throw new Error(`Icon with id "${id}" not found`)
    }

    return (
        <div
            className={cn(styles.wrapper, className)}
            style={inlineStyles}
            {...divProps}
        >
            <IconById />
        </div>
    )
}
