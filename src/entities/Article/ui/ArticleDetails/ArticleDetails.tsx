import React, { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { Skeleton } from '@shared/ui/Skeleton'
import { VStack } from '@shared/ui/Stack'
import { AppImage } from '@shared/ui/AppImage'
import { Text } from '@shared/ui/Text'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'

import { renderArticleBlock } from './renderBlock'

import styles from './ArticleDetails.module.scss'

const reducers = {
    articleDetails: articleDetailsReducer,
}

interface IArticleDetailsProps {
    className?: string
    id?: string
}
export const ArticleDetails: FC<IArticleDetailsProps> = memo(function ArticleDetails(props) {
    const { className, id } = props

    const { t } = useTranslation('articles')
    const dispatch = useAppDispatch()

    const { isLoading, data, error } = useAppSelector((state) => state.articleDetails) || {}

    useEffect(() => {
        dispatch(fetchArticleById({ id }))
    }, [dispatch, id])

    let content

    if (isLoading) {
        content = (
            <VStack gap={4}>
                <Skeleton width={200} height={24} />
                <Skeleton width={300} height={32} />
                <Skeleton width="100%" height={320} border="8" />
                {[...new Array(30).fill(null)].map((_, index) => (
                    <Skeleton key={index} width="100%" height={20} />
                ))}
            </VStack>
        )
    } else if (error) {
        content = <span>{t('details.error')}</span>
    } else {
        content = (
            <>
                <Text title={data?.title} size="l" bold />
                <Text title={data?.subtitle} />
                <VStack className={styles.wrapperImg} align="center">
                    <AppImage
                        fallback={<Skeleton width="100%" height={320} border="16px" />}
                        src={data?.img}
                        className={styles.img}
                    />
                </VStack>
                {data?.blocks.map(renderArticleBlock)}
            </>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cn(styles.wrapper, className)}>{content}</div>
        </DynamicModuleLoader>
    )
})
