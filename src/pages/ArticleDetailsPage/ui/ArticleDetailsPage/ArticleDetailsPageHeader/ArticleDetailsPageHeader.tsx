import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { Button } from '@shared/ui/Button/Button'
import { routePath } from '@shared/const/router'
import { getArticleDetailsData } from '@entities/Article'
import { getCanEditArticle } from '../../../model/selectors/article'

// import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails'
// import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article'

import styles from './ArticleDetailsPageHeader.module.scss'
import { AppLink } from '@shared/ui/AppLink/AppLink'

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader =
    memo(function ArticleDetailsPageHeader(props: ArticleDetailsPageHeaderProps) {
        const { className } = props
        const { t } = useTranslation()
        const navigate = useNavigate()


        const canEdit = useSelector(getCanEditArticle)
        const article = useSelector(getArticleDetailsData)

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(routePath.articleEdit(article.id))
            }
        }, [article, navigate])

        return (
            <div className={cn(styles.ArticleDetailsPageHeader, className)}>
                <AppLink to={routePath.articles}>
                    {String("<")}
                </AppLink>
                {canEdit && (
                    <Button
                        className={styles.editBtn}
                        variant='outline'
                        onClick={onEditArticle}
                    >
                        {t('Редактировать')}
                    </Button>
                )}
            </div>
        )
    })
