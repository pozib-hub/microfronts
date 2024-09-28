import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { ITextBlock } from '../../model/types/article'

import styles from './ArticleTextBlock.module.scss'

interface IArticleTextBlockProps {
    className?: string,
    block: ITextBlock
}
export const ArticleTextBlock: FC<IArticleTextBlockProps>
    = memo(function ArticleTextBlock(props) {
        const {
            className,
            block,
        } = props

        return (
            <div className={cn(styles.wrapper, className)}>
                {block.title && (
                    <div>
                        <h4 className={styles.title}>{block.title}</h4>
                    </div>
                )}
                {block.paragraphs.map((paragraph, index) => (
                    <span key={index} className={styles.paragraph}>
                        {paragraph}
                    </span>
                ))}
            </div>
        )
    })

