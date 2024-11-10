import React, { useCallback, memo, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import cn from '@shared/lib/classNames/classNames'
import { routePath } from '@shared/const/router'
import { AppLink } from '@shared/ui/AppLink/AppLink'
import { Button } from '@shared/ui/Button/Button'
import { Menu, MenuItem } from '@shared/ui/Menu/Menu'
import { Avatar } from '@shared/ui/Avatar/Avatar'
import { Text } from '@shared/ui/Text/Text'
import { LoginModal } from '@features/AuthByUsername'
import { getUserAuthData, userActions, UserRole } from '@entities/user'
import { NotificationButton } from '@features/NotificationButton'

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

    const optionsMenu: MenuItem[] = [
        {
            content: t('navbar.items.profile'),
            // onClick: onLogout,
        },
        {
            content: t('navbar.items.logout'),
            onClick: onLogout,
        }
    ]

    if (authData?.roles?.includes(UserRole.ADMIN)) {
        optionsMenu.push({
            content: t('navbar.items.adminPanel'),
            href: routePath.adminPanel,
        })
    }

    if (authData) {
        return (
            <header className={cn(style.navbar, className)}>
                <div className={style.links}>
                    <NotificationButton />

                    <AppLink to={routePath.about}>{t('navbar.items.about')}</AppLink>
                    <Menu
                        className={style.menu}
                        trigger={<Avatar size={28} src={authData.avatar} />}
                        direction='bottom left'
                        items={optionsMenu}
                    />

                </div>
            </header>
        )
    }

    return (
        <header className={cn(style.navbar, className)}>
            <div className={style.links}>
                <AppLink to={routePath.about}>
                    {t('navbar.items.about')}
                </AppLink>

                <Button variant='transparent' onClick={onOpenModal}>
                    <Text color='primary'>
                        {t('navbar.items.signIn')}
                    </Text>
                </Button>
            </div>
            <LoginModal
                isOpen={isOpenAuthModal}
                onClose={onCloseModal}
            // onChangeClose={setIsOpenAuthModal}
            />
        </header>
    )
})
