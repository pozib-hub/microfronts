import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

import { Modal } from '@shared/ui/Modal/Modal'
import { Text } from '@shared/ui/Text'
import { Drawer } from '@shared/ui/Drawer'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    // const { isArticlesPageWasOpened } = useAppSelector((state) => state.userSettings)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if (!isArticlesPageWasOpened) {
    //         setIsOpen(true)
    //         // dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }))
    //     }
    // }, [dispatch, isArticlesPageWasOpened])

    const onClose = () => setIsOpen(false)

    const text = (
        <Text title={t('Добро пожаловать на страницу статей')}>
            {t('Здесь вы можете искать и просматривать статьи на различные темы')}
        </Text>
    )

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    )
})
