import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { FlipCard } from '@shared/ui/FlipCard'

import styles from './NavigateTileCards.module.scss'

interface INavigation {
    title: string
    caption: string
    to: string
    image?: string
    children?: Array<{
        title: string
        to: string
    }>
}

interface INavigateTileCardsProps {
    actionFlip?: 'hover' | 'click'
    navigations: INavigation[]
}

export const NavigateTileCards: FC<INavigateTileCardsProps> = memo(
    function NavigateTileCards(props) {
        const { navigations, actionFlip = 'hover' } = props

        const navigate = useNavigate()

        const { t } = useTranslation()

        const onClickNavigate = (to: string) => {
            navigate(to)
        }

        return (
            <div className={styles.wrapper}>
                {navigations.map((navigate) => {
                    return (
                        <FlipCard
                            key={navigate.to}
                            classNameWrapper={cn(styles.card)}
                            classNameContainer={styles.card__container}
                            classNameContent={styles.card__content}
                            actionFlip={actionFlip}
                            disabled={!navigate.children}
                            frontContent={
                                <div
                                    className={styles.card__front_content}
                                    role="link"
                                    tabIndex={0}
                                    onClick={() => onClickNavigate(navigate.to)}
                                >
                                    <div>
                                        <h3 className={styles.card__title}>{t(navigate.title)}</h3>
                                        <span className={styles.card__caption}>
                                            {t(navigate.caption)}
                                        </span>
                                    </div>
                                    <div className={styles.card__container_img}>
                                        <img className={styles.img} src={navigate.image} />
                                    </div>
                                </div>
                            }
                            backContent={
                                <div className={styles.card__back_content}>
                                    <div>
                                        <h3 className={styles.card__title}>{t(navigate.title)}</h3>
                                        <span className={styles.card__caption}>
                                            {t('backContent.backContent.caption')}
                                        </span>
                                    </div>
                                    <ul className={styles.card__sub_list}>
                                        {navigate.children?.map((subNavigate) => {
                                            return (
                                                <li key={subNavigate.to}>
                                                    <NavLink to={subNavigate.to}>
                                                        {t(subNavigate.title)}
                                                    </NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                        />
                    )
                })}
            </div>
        )
    },
)
