import cn from 'shared/lib/classNames/classNames'
import { HTMLAttributes, memo, ReactNode } from 'react'
import styles from './Card.module.scss'

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card = memo(function Card(props: ICardProps) {
    const {
        className,
        children,
        ...otherProps
    } = props

    return (
        <div
            className={cn(styles.wrapper, className)}
            {...otherProps}
        >
            {children}
        </div>
    )
})
