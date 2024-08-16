import React, { useCallback, memo, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import cn from 'src/shared/lib/classNames/classNames'
import { routePath } from 'shared/config/routerConfig/routerConfig'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { Button } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { getUserAuthData, userActions } from 'entities/user'

import style from './Navbar.module.scss'
interface INavbarProps {
    className?: string;
}

export const Navbar: FC<INavbarProps> = memo(function Navbar(props) {
    const { className } = props

    const { t } = useTranslation()
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)

    const dispatch = useDispatch()
    const authData = useSelector(getUserAuthData)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const onCloseModal = useCallback(() => {
        setIsOpenAuthModal(false)
    }, [])

    const onOpenModal = useCallback(() => {
        setIsOpenAuthModal(true)
    }, [])


    if (authData) {
        return <header className={cn(style.navbar, className)}>
            <div className={style.links}>
                <AppLink to={routePath.about}>{t('about')}</AppLink>
                <Button variant='transparent' onClick={onLogout}>
                    {t('logOut')}
                </Button>
            </div>
        </header>
    }

    return (
        <header className={cn(style.navbar, className)}>
            <div className={style.links}>
                <AppLink to={routePath.about}>{t('about')}</AppLink>
                <Button variant='transparent' onClick={onOpenModal}>
                    {t('signIn')}
                </Button>
            </div>
            <LoginModal isOpen={isOpenAuthModal} onClose={onCloseModal} />
        </header>
    )
})
