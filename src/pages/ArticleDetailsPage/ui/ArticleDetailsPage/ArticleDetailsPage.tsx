import { memo } from 'react'
import { useParams } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleRating } from '@features/ArticleRating'
import { ArticleRecommendationsList } from '@features/ArticleRecommendationsList'
import { useToggleFnFeatures } from '@shared/lib/features/useToggleFnFeatures'
import { VStack } from '@shared/ui/Stack'
import { StickyLayout } from '@shared/layouts/StickyLayout'

import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { DetailsContainer } from '../DetailsContainer/DetailsContainer'
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer'

import styles from './ArticleDetailsPage.module.scss'

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
}

interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props

    const { id = '' } = useParams()

    const ArticleRatingFeature = useToggleFnFeatures({
        name: 'isArticleRatingEnabled',
        on: () => <ArticleRating articleId={id} />,
        off: () => <div></div>,
    })

    return (
        <DynamicModuleLoader reducers={reducers}>
            <StickyLayout
                content={
                    <div className={cn(styles.wrapper, className)}>
                        <VStack gap={4} fullWidth>
                            <DetailsContainer />
                            <ArticleRating articleId={id} />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </div>
                }
                right={<AdditionalInfoContainer />}
            />
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
