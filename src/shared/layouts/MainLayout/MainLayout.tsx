import { memo, ReactElement } from 'react'

import classNames from '@shared/lib/classNames/classNames'

import styles from './MainLayout.module.scss'

interface IMainLayoutProps {
    className?: string
    header: ReactElement
    content: ReactElement
    sidebar: ReactElement
    toolbar?: ReactElement
}

export const MainLayout = memo((props: IMainLayoutProps) => {
    const { className, content, toolbar, header, sidebar } = props

    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.content}>{content}</div>
            <div className={styles.sidebar}>{sidebar}</div>
            <div className={styles.rightbar}>
                <div className={styles.header}>{header}</div>
                <div className={styles.toolbar}>{toolbar}</div>
            </div>
        </div>
    )
})
