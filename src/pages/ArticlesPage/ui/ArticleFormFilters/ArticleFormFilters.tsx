import React, { FC, memo, useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { Tags } from '@shared/ui/Tags/Tags'
import { ArticleType } from '@entities/Article'

import { articlesPageActions } from '../../models/slice/ArticlesPageSlice'

import styles from './ArticleFormFilters.module.scss'

const types = (Object.keys(ArticleType) as Array<keyof typeof ArticleType>)
    .map((key) => ({ value: ArticleType[key], label: key }))

export interface IArticleFormFilters {
    type: ArticleType[]
}

interface IArticleFormFiltersProps {
    className?: string
    onSubmit: () => void
}
export const ArticleFormFilters: FC<IArticleFormFiltersProps> =
    memo(function ArticleFormFilters(props) {
        const {
            className,
        } = props

        const { t } = useTranslation()
        const dispatch = useAppDispatch()

        const {
            filters,
        } = useAppSelector(state => state.articlesPage) || {}

        const { control, handleSubmit } = useForm<IArticleFormFilters>({
            defaultValues: {
                type: filters?.type || []
            }
        })

        const onSubmit: SubmitHandler<IArticleFormFilters> = useCallback((data) => {
            dispatch(articlesPageActions.setFilters(data))
            props.onSubmit()
        }, [dispatch, props])

        return (
            <div className={cn(styles.wrapper, className)}>
                <h2 className={styles.header}>{t("filters")}</h2>
                <form
                    id="article-form-filters"
                    className={styles.from}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={styles.field}>
                        <div className={styles.label}>
                            Тип статьи:
                        </div>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) =>
                                <Tags
                                    className={styles.tags}
                                    isMulti
                                    tags={types}
                                    {...field}
                                    onChange={(tags) => field.onChange(tags.map(tag => tag.value))}
                                />
                            }
                        />
                    </div>
                </form>
            </div >
        )
    })
