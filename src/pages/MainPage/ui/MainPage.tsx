import React from 'react'

import cn from 'src/shared/lib/classNames/classNames'

import styles from './MainPage.module.scss'

interface IMainPage {
    className?: string
}

const MainPage = (props: IMainPage) => {
    const { className } = props

    return <div className={cn(styles.page, className)}>Main</div>
}

export default MainPage
