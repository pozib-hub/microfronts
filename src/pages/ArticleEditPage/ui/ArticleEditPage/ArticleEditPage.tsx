import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'

import styles from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo(function ArticleEditPage(props: ArticleEditPageProps) {
    const { className } = props
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()

    const isEdit = Boolean(id)

    return (
        <div className={cn(styles.wrapper, className)}>
            {isEdit
                ? t('Редактирование статьи с ID = ') + id
                : t('Создание новой статьи')}
        </div>
    )
})

export default ArticleEditPage
