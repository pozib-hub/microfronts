import React, { FC, memo } from 'react'

import cn from 'shared/lib/classNames/classNames'

import styles from './Tab.module.scss'

interface ITabProps {
    className?: string
}
export const Tab: FC<ITabProps> =
    memo(function Tab(props) {
        const {
            className,
        } = props


        return (
            <div className={cn(styles.wrapper, className)}>
                <div />
            </div>
        )
    })

