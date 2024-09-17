import React, { FC, memo } from 'react'

import cn from 'shared/lib/classNames/classNames'

import styles from './TabList.module.scss'

interface ITabListProps {
    className?: string
}
export const TabList: FC<ITabListProps> =
    memo(function TabList(props) {
        const {
            className,
        } = props

        return (
            <div className={cn(styles.wrapper, className)}>
                <div />
            </div>
        )
    })

