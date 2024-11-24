import React, { FC, memo, ReactElement } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './StickyLayout.module.scss'

interface ISickyLayoutProps {
    className?: string
    left?: ReactElement
    content: ReactElement
    right?: ReactElement
}
export const StickyLayout: FC<ISickyLayoutProps> = memo(function SickyLayout(props) {
    const { className, content, left, right } = props

    return (
        <div className={cn(styles.wrapper, className)}>
            {left && <div className={styles.left}>{left}</div>}
            <div className={styles.content}>{content}</div>
            {right && <div className={styles.right}>{right}</div>}
        </div>
    )
})
