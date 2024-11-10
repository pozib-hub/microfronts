import { CSSProperties, useMemo } from 'react'
import cn from '@shared/lib/classNames/classNames'

import { AppImage } from '../AppImage'
import { Icon } from '../Icon/Icon'
import { Skeleton } from '../Skeleton/Skeleton'

import styles from './Avatar.module.scss'

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({
    className,
    src,
    size = 100,
    alt,
}: AvatarProps) => {


    const inlineStyles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size])

    return (
        <AppImage
            className={cn(styles.Avatar, className)}
            src={src}
            alt={alt}
            style={inlineStyles}
            fallback={<Skeleton width={size} height={size} border='50%' />}
            errorFallback={<Icon inverted id="UserFilled" size={size} />}
        />
    )
}
