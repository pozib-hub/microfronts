import React, { FC, memo, useEffect, useState } from 'react'
import { isDesktop, isTablet, isMobile } from 'react-device-detect'

import { CacheStorageBrowser } from '@utils/CacheStorageBrowser'
import { Carousel } from '@shared/ui/Carousel'
import { AppLink } from '@shared/ui/AppLink'

import { PageBannerApi } from '../model/api/pageBannerApi'

import styles from './PageBanners.module.scss'

interface IItem {
    name: string
    src?: string
    order?: string
    redirect?: string
}

interface IBannerObj {
    [name: string]: Omit<IItem, 'name'>
}

interface IPageBannersProps {
    className?: string
    items: IItem[]
}

export const PageBanners: FC<IPageBannersProps> = memo(function PageBanner(props) {
    const { className, items } = props

    const [bannerObj, setBannerObj] = useState<IBannerObj>({})
    //     let deviceType = 'desktop'

    //     if (isTablet) {
    //         deviceType = 'tablet'
    //     } else if (isMobile) {
    //         deviceType = 'mobile'
    //     }

    // let skeletonHeight = '100%'
    // if (isDesktop) {
    //     skeletonHeight = '240px'
    // } else if (isTablet) {
    //     skeletonHeight = '186px'
    // } else {
    //     skeletonHeight = '160px'
    // }

    useEffect(() => {
        items.forEach((item) => {
            if (item.src) {
                setBannerObj((prev) => {
                    prev[item.name] = { ...item }
                    return { ...prev }
                })
                return
            }

            // изначально берем баннер из кеша
            CacheStorageBrowser.getImage(item.name)
                .then((src) => {
                    setBannerObj((prev) => {
                        prev[item.name] = { ...item, src }
                        return { ...prev }
                    })
                })
                .catch(() => {})

            PageBannerApi.get({ name: item.name })
                .then((src) => {
                    setBannerObj((prev) => {
                        prev[item.name] = { ...item, src }
                        return { ...prev }
                    })

                    CacheStorageBrowser.setImage(item.name, src)
                })
                .catch(() => {})
        })
    }, [items])

    const keysBannerObj = Object.keys(bannerObj)

    return (
        <Carousel
            isLoading={!keysBannerObj.length}
            autoPlay
            infiniteLoop
            dynamicDots
            stopOnHover
            emulateTouch
            showThumbs={false}
            showStatus={false}
            skeleton={{ borderRadius: '16px', height: 237 }}
        >
            {keysBannerObj.map((name) => {
                const banner = bannerObj[name]
                if (banner.redirect) {
                    return (
                        <AppLink key={name} className={styles.wrapperImg} to={banner.redirect}>
                            <img src={banner.src} />
                        </AppLink>
                    )
                }

                return (
                    <div key={name} className={styles.wrapperImg}>
                        <img src={banner.src} />
                    </div>
                )
            })}
        </Carousel>
    )
})
