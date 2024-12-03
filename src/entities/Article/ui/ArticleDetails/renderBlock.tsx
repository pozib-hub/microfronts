import { ArticleBlock } from '../../model/types/article'
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'

import styles from './ArticleDetails.module.scss'

export const renderArticleBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case 'CODE':
            return <ArticleCodeBlock key={block.id} block={block} className={styles.block} />
        case 'IMAGE':
            return <ArticleImageBlock key={block.id} block={block} className={styles.block} />
        case 'TEXT':
            return <ArticleTextBlock key={block.id} block={block} className={styles.block} />
        default:
            return null
    }
}
