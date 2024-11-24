import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { Icon, IconId } from '@shared/ui/Icon/Icon'
import { Card } from '@shared/ui/Card'
import { ArticleView } from '@entities/Article'

import styles from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes: Array<{ view: ArticleView; icon: IconId }> = [
    {
        view: 'tiles',
        icon: 'Tiled',
    },
    {
        view: 'list',
        icon: 'List',
    },
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView)
    }

    return (
        <Card className={cn(styles.wrapper, className)} border="round">
            {viewTypes.map((viewType) => (
                <Icon
                    key={viewType.view}
                    id={viewType.icon}
                    clickable
                    onClick={onClick(viewType.view)}
                    className={cn({
                        [styles.selected]: viewType.view === view,
                    })}
                />
            ))}
        </Card>
    )
})
