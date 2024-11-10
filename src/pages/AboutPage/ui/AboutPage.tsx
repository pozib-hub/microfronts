import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import styles from './AboutPage.module.scss'


interface IAboutPage {
    className?: string
}

const AboutPage = (props: IAboutPage) => {
    const { className } = props

    const { t } = useTranslation()


    return <div data-testId="AboutPage" className={cn(styles.page, className)}></div >
}

export default AboutPage
