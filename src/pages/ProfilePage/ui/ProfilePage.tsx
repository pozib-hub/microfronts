
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { AppLink } from '@shared/ui/AppLink/AppLink'
import { routePath } from '@shared/const/router'
import { EditableProfileCard } from '@features/EditableProfileCard'

import styles from './ProfilePage.module.scss'


interface IProfilePage {
    className?: string
}

const ProfilePage: FC<IProfilePage> = (props) => {
    const { className } = props

    const location = useLocation()
    const { t } = useTranslation()
    const { id } = useParams()

    return (
        <div data-testId="ProfilePage" className={cn(styles.page, className)}>
            {location.state?.article
                && <AppLink to={routePath.articles + location.state.article.id}>
                    {"<"}
                    {" "}
                    {location.state.article.title}
                </AppLink>}
            <EditableProfileCard id={id} />
        </div>
    )
}

export default ProfilePage
