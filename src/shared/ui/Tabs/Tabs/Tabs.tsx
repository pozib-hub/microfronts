import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Tabs.module.scss'

interface ITabsProps {
    className?: string
}
export const Tabs: FC<ITabsProps> =
    memo(function Tabs(props) {
        const {
            className,
        } = props


        return (
            <div className={cn(styles.wrapper, className)}>
                <div />
            </div>
        )
    })

