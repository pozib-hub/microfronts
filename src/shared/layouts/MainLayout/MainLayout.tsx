import { memo, ReactElement } from 'react'

import classNames from '@shared/lib/classNames/classNames'

import styles from './MainLayout.module.scss'

interface IMainLayoutProps {
    className?: string
    rightNavbar: ReactElement
    content: ReactElement
    sidebar: ReactElement
    toolbar?: ReactElement
}

export const MainLayout = memo((props: IMainLayoutProps) => {
    const { className, content, toolbar, rightNavbar, sidebar } = props

    return (
        <div className={classNames(styles.wrapper, className)}>
            <section className={styles.content}>{content}</section>
            <div className={styles.sidebar}>{sidebar}</div>
            <div className={styles.rightbar}>
                <div className={styles.header}>{rightNavbar}</div>
                <div className={styles.toolbar}>{toolbar}</div>
            </div>
        </div>
    )
})
