
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { VStack } from 'shared/ui/Stack'
import { ArticleList } from 'entities/Article'
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi'



export const ArticleRecommendationsList = memo((props) => {
    const { t } = useTranslation()

    const { isLoading, data, isError } = useArticleRecommendationsList(3)

    if (isError || !data) {
        return null
    }

    return (
        <VStack>
            <VStack>
                Рекомендуем
                <ArticleList
                    view='tiles'
                    isLoading={isLoading}
                    items={data}
                    target='_blank'
                />
            </VStack>
        </VStack>
    )
})