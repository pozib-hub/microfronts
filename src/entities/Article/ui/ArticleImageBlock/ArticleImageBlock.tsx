import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { IImageBlock } from '../../model/types/article'

import styles from './ArticleImageBlock.module.scss'

interface IArticleImageBlockProps {
    className?: string
    block: IImageBlock
}
export const ArticleImageBlock: FC<IArticleImageBlockProps> =
    memo(function ArticleImageBlock(props) {
        const {
            className,
            block
        } = props

        return (
            <div className={cn(styles.wrapper, className)}>
                <img className={styles.img} src={block.src} alt={block.title} />
                {block.title && (
                    <span>{block.title}</span>
                )}
            </div>
        )
    })

