import React, { FC, memo } from 'react'

import cn from 'shared/lib/classNames/classNames'

import styles from './TabPanel.module.scss'

interface ITabPanelProps {
    className?: string
}
export const TabPanel: FC<ITabPanelProps> =
    memo(function TabPanel(props) {
        const {
            className,
        } = props


        return (
            <div className={cn(styles.wrapper, className)}>
                <div />
            </div>
        )
    })

