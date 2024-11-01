import { useTranslation } from 'react-i18next'
import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

import cn from '@shared/lib/classNames/classNames'
import { Card } from '@shared/ui/Card/Card'
import { HStack, VStack } from '@shared/ui/Stack'
import { Text } from '@shared/ui/Text/Text'
import { StarRating } from '@shared/ui/StarRating/StarRating'
import { Modal } from '@shared/ui/Modal/Modal'
import { Input } from '@shared/ui/Input/Input'
import { Button } from '@shared/ui/Button/Button'
// import { Drawer } from '@shared/ui/Drawer/Drawer'

interface IRatingCardProps {
    className?: string;
    title?: string;
    rate?: number
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: IRatingCardProps) => {
    const {
        className,
        rate = 0,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
    } = props
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starsCount, setStarsCount] = useState(rate)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount)
        if (hasFeedback) {
            setIsModalOpen(true)
        } else {
            onAccept?.(selectedStarsCount)
        }
    }, [hasFeedback, onAccept])

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(starsCount, feedback)
    }, [feedback, onAccept, starsCount])

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(starsCount)
    }, [onCancel, starsCount])

    const modalContent = (
        <>
            <Text
                title={feedbackTitle}
            />
            <Input
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('Ваш отзыв')}
            />
        </>
    )

    return (
        <Card className={cn(className)}>
            <VStack align="center" gap="8">
                <Text title={title}>{title}</Text>
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen}>
                    <VStack max gap="32">
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <Button variant='transparent' onClick={cancelHandle}>
                                {t('Закрыть')}
                            </Button>
                            <Button onClick={acceptHandle}>
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                {/* <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <Button fullWidth onClick={acceptHandle} size={"large"}>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer> */}
            </MobileView>
        </Card>
    )
})
