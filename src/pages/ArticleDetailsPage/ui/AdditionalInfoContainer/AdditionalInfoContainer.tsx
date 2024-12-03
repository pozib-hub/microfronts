import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Card } from '@shared/ui/Card'
import { ArticleAdditionalInfo } from '@widgets/ArticleAdditionalInfo'
import { getArticleDetailsData } from '@entities/Article'
import { routePath } from '@shared/const/router'

import styles from './AdditionalInfoContainer.module.scss'
import { getUserAuthData } from '@entities/user'

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData)
    const authData = useSelector(getUserAuthData)

    const navigate = useNavigate()

    const isCanEdit = article?.user?.id === authData?.id

    const onEditArticle = useCallback(() => {
        if (isCanEdit && article) {
            navigate(routePath.articleEdit(article.id))
        }
    }, [isCanEdit, article, navigate])

    if (!article) {
        return null
    }

    return (
        <Card padding={4} border="partial" className={styles.card}>
            <ArticleAdditionalInfo isCanEdit={isCanEdit} article={article} onEdit={onEditArticle} />
        </Card>
    )
})
