import React, { FC, memo } from 'react'

import cn from 'shared/lib/classNames/classNames'

import styles from './ArticleCodeBlock.module.scss'
import { ICodeBlock } from 'entities/Article/model/types/article'
import { Code } from 'shared/ui/Code/Code'

interface IArticleCodeBlockProps {
    className?: string
    block: ICodeBlock
}
export const ArticleCodeBlock: FC<IArticleCodeBlockProps> =
    memo(function ArticleCodeBlock(props) {
        const {
            className,
            block,
        } = props

        return (
            <div className={cn(styles.wrapper, className)}>
                <Code>{block.code}</Code>
            </div>
        )
    })

