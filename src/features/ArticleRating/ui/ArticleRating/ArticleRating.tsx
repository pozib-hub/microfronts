import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { RatingCard } from '@entities/Rating'
import { Skeleton } from '@shared/ui/Skeleton/Skeleton'

import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props
    const { t } = useTranslation('articles')

    const { data, isLoading } = useGetArticleRating({
        articleId,
    })
    const [rateArticleMutation] = useRateArticle()

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    rate: starsCount,
                    feedback,
                })
            } catch (e) {
                // handle error
                console.log(e)
            }
        },
        [articleId, rateArticleMutation],
    )

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback)
        },
        [handleRateArticle],
    )

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount)
        },
        [handleRateArticle],
    )

    if (!articleId) {
        return null
    }

    if (isLoading) {
        return <Skeleton width="100%" height={120} />
    }

    const sumRating = data?.reduce((acc, rate) => rate.rate + acc, 0) || 0
    const rating = Math.round(sumRating / (data?.length || 0))

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating}
            className={className}
            title={t('rating.rateArticle')}
            feedbackTitle={t('rating.pleaseLeaveReview')}
            hasFeedback
        />
    )
})

export default ArticleRating
