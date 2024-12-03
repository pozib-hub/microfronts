import React, { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { AppLink } from '@shared/ui/AppLink'
import { routePath } from '@shared/const/router'
import { EditableProfileCard } from '@features/EditableProfileCard'
import { Text } from '@shared/ui/Text'
import { HStack } from '@shared/ui/Stack'

import styles from './ProfilePage.module.scss'

interface IProfilePage {
    className?: string
}

const ProfilePage: FC<IProfilePage> = (props) => {
    const { className } = props

    const location = useLocation()
    const { id } = useParams()

    const { t } = useTranslation('pages')

    return (
        <div data-testid="ProfilePage" className={cn(styles.page, className)}>
            <HStack gap={3} align="baseLine">
                {location.state?.article && (
                    <>
                        <AppLink to={routePath.articles + '/' + location.state.article.id}>
                            <Text size="s">{location.state.article.title}</Text>
                        </AppLink>
                        &rarr;
                    </>
                )}
                <Text size="s">{t('pageProfile.header')}</Text>
            </HStack>
            <EditableProfileCard id={id} />
        </div>
    )
}

export default ProfilePage
