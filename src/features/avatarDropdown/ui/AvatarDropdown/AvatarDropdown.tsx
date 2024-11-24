import { useTranslation } from 'react-i18next'
import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import cn from '@shared/lib/classNames/classNames'
import { getUserAuthData, userActions, UserRole } from '@entities/user'
import { Dropdown } from '@shared/ui/Popups'
import { Avatar } from '@shared/ui/Avatar'
import { routePath } from '@shared/const/router'

import styles from './AvatarDropdown.module.scss'

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const authData = useSelector(getUserAuthData)
    const isAdmin = authData?.roles?.includes(UserRole.ADMIN)
    const isManager = authData?.roles?.includes(UserRole.MANAGER)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvailable = isAdmin || isManager

    if (!authData) {
        return null
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('navbar.items.adminPanel'),
                      href: routePath.adminPanel,
                  },
              ]
            : []),
        {
            content: t('navbar.items.profile'),
            href: routePath.profile(),
        },
        {
            content: t('navbar.items.logout'),
            onClick: onLogout,
        },
    ]

    return (
        <Dropdown
            direction="bottom left"
            className={cn(className)}
            items={items}
            trigger={
                <div className={styles.avatar}>
                    <Avatar size={28} src={authData.avatar} />
                    <span className={styles.username}>{authData.username}</span>
                </div>
            }
        />
    )
})
