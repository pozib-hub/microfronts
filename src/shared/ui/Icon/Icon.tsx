import { CSSProperties, useMemo } from 'react'
import cn from '@shared/lib/classNames/classNames'

import * as Icons from '../../assets/icons/svg'

import styles from './Icon.module.scss'

export type IconId = keyof typeof Icons

interface IProps {
    className?: string;
    size?: number;
    id: IconId
}

export const Icon = (props: IProps) => {
    const {
        id,
        className,
        size,
    } = props


    const inlineStyles = useMemo<CSSProperties>(() => ({
        width: size || 25,
        height: size || 25,
    }), [size])

    const Icon = Icons[id]

    return (
        <div
            className={cn(styles.wrapper, className)}
            style={inlineStyles}
        >
            <Icon />
        </div>
        // <img
        //     src={src}
        //     alt={alt}
        //     style={inlineStyles}
        //     className={cn(styles.Avatar, className)}
        // />
    )
}
