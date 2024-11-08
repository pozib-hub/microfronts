import { Meta, StoryObj } from '@storybook/react'

import ArticleRating from './ArticleRating'
import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof ArticleRating> = {
    title: 'features/ArticleRating',
    component: ArticleRating,
    decorators: [StoreDecorator({})]
}

export default meta

type Story = StoryObj<typeof ArticleRating>;

export const Base: Story = {
    args: {
        articleId: "1"
    }
}   
