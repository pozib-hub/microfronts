import React, { useCallback, memo, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'
import { Text } from '@shared/ui/Text/Text'
import { LoginModal } from '@features/AuthByUsername'
import { getUserAuthData } from '@entities/user'
import { NotificationButton } from '@features/NotificationButton'
import { VStack } from '@shared/ui/Stack'
import { AvatarDropdown } from '@features/avatarDropdown'

import styles from './Navbar.module.scss'

interface INavbarProps {
    className?: string
}

export const Navbar: FC<INavbarProps> = memo(function NewNavbar(props) {
    const { className } = props

    const { t } = useTranslation()
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)

    const authData = useSelector(getUserAuthData)

    const onCloseModal = useCallback(() => {
        setIsOpenAuthModal(false)
    }, [])

    const onOpenModal = useCallback(() => {
        setIsOpenAuthModal(true)
    }, [])

    if (authData) {
        return (
            <header className={cn(styles.navbar, className)}>
                <VStack gap={4} align="center">
                    <AvatarDropdown />
                    <NotificationButton />
                </VStack>
            </header>
        )
    }

    return (
        <header className={cn(styles.navbar, className)}>
            <VStack gap={4} align="center">
                <Button variant="clear" onClick={onOpenModal}>
                    <Text>{t('navbar.items.signIn')}</Text>
                </Button>
            </VStack>
            <LoginModal isOpen={isOpenAuthModal} onClose={onCloseModal} />
        </header>
    )
})
