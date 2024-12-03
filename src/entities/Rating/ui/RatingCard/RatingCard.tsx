import { useTranslation } from 'react-i18next'
import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

import { Card } from '@shared/ui/Card/Card'
import { HStack, VStack } from '@shared/ui/Stack'
import { Text } from '@shared/ui/Text'
import { StarRating } from '@shared/ui/deprecated/StarRating/StarRating'
import { Modal } from '@shared/ui/Modal/Modal'
import { Input } from '@shared/ui/Input/Input'
import { Button } from '@shared/ui/Button/Button'
import { Drawer } from '@shared/ui/Drawer'

interface IRatingCardProps {
    className?: string
    title?: string
    rate?: number
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: IRatingCardProps) => {
    const { className, rate = 0, onAccept, feedbackTitle, hasFeedback, onCancel, title } = props
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starsCount, setStarsCount] = useState(rate)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount)
            if (hasFeedback) {
                setIsModalOpen(true)
            } else {
                onAccept?.(selectedStarsCount)
            }
        },
        [hasFeedback, onAccept],
    )

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
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.Input"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('yourReview')}
            />
        </>
    )

    return (
        <Card fullWidth border="partial" padding={6}>
            <VStack align="center" gap={2} fullWidth>
                <Text title={starsCount ? t('thanksRating') : title} />
                <StarRating selectedStars={starsCount} size={30} onSelect={onSelectStars} />

                <BrowserView>
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack gap={8}>
                            {modalContent}
                            <HStack fullWidth gap={4} justify="end">
                                <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                                    {t('close')}
                                </Button>
                                <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                                    {t('send')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                </BrowserView>

                <MobileView>
                    <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                        <VStack gap={8}>
                            {modalContent}
                            <Button fullWidth onClick={acceptHandle} size="l">
                                {t('send')}
                            </Button>
                        </VStack>
                    </Drawer>
                </MobileView>
            </VStack>
        </Card>
    )
})
