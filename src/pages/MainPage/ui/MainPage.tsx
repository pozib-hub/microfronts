import React from 'react'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { PageBanners } from '@features/PageBanners'
import { Text } from '@shared/ui/Text'
import { routePath } from '@shared/const/router'
import { NavigateTileCards } from '@widgets/NavigateTileCards'

import styles from './MainPage.module.scss'

const getNavigations = (t: TFunction<'', undefined>) => [
    {
        title: t('navigations.items.about.title'),
        to: routePath.about,
        caption: t('navigations.items.about.caption'),
    },
    {
        title: t('navigations.items.profile.title'),
        to: routePath.profile(),
        caption: t('navigations.items.profile.caption'),
    },
    // {
    //     title: t('navigations.items.catalog.title'),
    //     to: '',
    //     caption: t('navigations.items.catalog.title'),
    //     children: [
    //         {
    //             title: t('navigations.items.catalog.subitems.main'),
    //             to: routePath.CharacteristicsUVHD,
    //         },
    //         {
    //             title: t('navigations.items.catalog.subitems.kit'),
    //             to: routePath.forbidden,
    //         },
    //         {
    //             title: t('navigations.items.catalog.subitems.clothes'),
    //             to: routePath.forbidden,
    //         },
    //         {
    //             title: t('navigations.items.catalog.subitems.office'),
    //             to: routePath.forbidden,
    //         },
    //     ],
    // },
]

// const banners = [{ name: 'HOME' }, { name: 'CATALOG' }]
const banners = [{ name: 'HOME' }]

interface IMainPage {
    className?: string
}

const MainPage = (props: IMainPage) => {
    const { className } = props

    const { t } = useTranslation('pages', { keyPrefix: 'pageHome' })

    const navigations = getNavigations(t)

    return (
        <div data-testid="MainPage" className={cn(styles.page, className)}>
            <PageBanners items={banners} />
            <Text size="l">{t('header')}</Text>
            <NavigateTileCards navigations={navigations} />
        </div>
    )
}

export default MainPage
