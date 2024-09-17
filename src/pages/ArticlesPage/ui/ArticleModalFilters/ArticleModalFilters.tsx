import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'shared/lib/classNames/classNames'

import styles from './ArticleModalFilters.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { ArticleFormFilters } from '../ArticleFormFilters/ArticleFormFilters'
import { Button } from 'shared/ui/Button/Button'

interface IArticlePageFiltersProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}
export const ArticleModalFilters: FC<IArticlePageFiltersProps> =
    memo(function ArticlePageFilters(props) {
        const {
            className,
            isOpen,
            onClose,
        } = props

        const { t } = useTranslation()

        return null

        // return (
        //     <Modal
        //         classNames={{
        //             body: cn(styles.wrapper, className)
        //         }}
        //         orientation='right'
        //         isOpen={isOpen}
        //         onClose={onClose}
        //     >
        //         <ArticleFormFilters onSubmit={onClose} />

        //         {/* outside form submit */}
        //         <div className={styles.bottom}>
        //             <Button
        //                 variant='primary'
        //                 type="submit"
        //                 form="article-form-filters"
        //             >
        //                 {t("save")}
        //             </Button>
        //             <Button
        //                 variant='outline'
        //                 onClick={() => onClose()}
        //             >
        //                 {t("close")}
        //             </Button>
        //         </div>
        //     </Modal>
        // )
    })

