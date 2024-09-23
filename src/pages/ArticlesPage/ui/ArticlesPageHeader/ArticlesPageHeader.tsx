import React, { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'shared/lib/classNames/classNames'

import styles from './ArticlesPageHeader.module.scss'
import { Button } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { Input } from 'shared/ui/Input/Input'
import { articlesPageActions } from '../../models/slice/ArticlesPageSlice'
import { ArticleModalFilters } from '../ArticleModalFilters/ArticleModalFilters'

interface IArticlesPageHeaderProps {
    className?: string
}
export const ArticlesPageHeader: FC<IArticlesPageHeaderProps> =
    memo(function ArticlesPageHeader(props) {
        const {
            className,
        } = props

        const [isOpenModalFilters, setIsOpenModalFilters] = useState(false)


        const { t } = useTranslation()
        const dispatch = useAppDispatch()

        const {
            isLoading,
            view,
            order,
            sort,
            search = "",
        } = useAppSelector(state => state.articlesPage) || {}

        const onClickIconList = useCallback(() => {
            dispatch(articlesPageActions.setView("list"))
        }, [dispatch])

        const onClickIconTiles = useCallback(() => {
            dispatch(articlesPageActions.setView("tiles"))
        }, [dispatch])

        const onChangeSort = useCallback(() => {
            dispatch(articlesPageActions.setOrder(order === "desc" ? "asc" : "desc"))
        }, [dispatch, order])

        const onChangeSearch = useCallback((value: string) => {
            dispatch(articlesPageActions.setSearch(value))
        }, [dispatch])

        const onCloseModal = useCallback(() => {
            setIsOpenModalFilters(false)
        }, [])

        return (
            <div className={cn(styles.wrapper, className)}>
                <div className={styles.left}>
                    <Button
                        className={cn(
                            styles["btn-view"],
                            { [styles.selected]: view === "list" }
                        )}
                        variant='transparent'
                        onClick={onClickIconList}
                    >
                        <Icon id="List" />
                    </Button>
                    <Button
                        className={cn(
                            styles["btn-view"],
                            { [styles.selected]: view === "tiles" }
                        )}
                        variant='transparent'
                        onClick={onClickIconTiles}

                    >
                        <Icon id="Tiles" />
                    </Button>
                </div>
                <div className={styles.right}>
                    <Input
                        placeholder={t("search")}
                        variant='filled'
                        value={search}
                        onChange={e => onChangeSearch(e.target.value)}
                    />
                    <Button
                        variant='transparent'
                        onClick={onChangeSort}
                    >
                        <Icon id={order === "desc" ? "OrderAsc" : "OrderDesc"} size={20} />
                    </Button >
                    <Button
                        variant='transparent'
                        onClick={() => setIsOpenModalFilters(prev => !prev)}
                    >
                        <Icon id='Filter' size={20} />
                    </Button >
                </div>
                <ArticleModalFilters isOpen={isOpenModalFilters} onClose={onCloseModal} />
            </div>
        )
    })

