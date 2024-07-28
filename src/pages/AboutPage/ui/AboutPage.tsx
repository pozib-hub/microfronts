import React from 'react'

import cn from 'src/shared/lib/classNames/classNames'

import styles from './AboutPage.module.scss'

interface IAboutPage {
    className?: string
}

const AboutPage = (props: IAboutPage) => {
    const { className } = props

    return <div className={cn(styles.page, className)}>About</div>
}

export default AboutPage
