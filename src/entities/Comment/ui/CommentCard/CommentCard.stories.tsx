import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { CommentCard } from './CommentCard'

const meta: Meta<typeof CommentCard> = {
    title: 'entities/CommentCard',
    component: CommentCard,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof CommentCard>;

export const Normal: Story = {
    args: {
        comment: {
            articleId: "1",
            id: "1",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. soluta corporis autem quod!",
            user: {
                id: "1",
                username: "John Doe",
                avatar: "https://example.com/avatar.jpg"
            }
        },
        isLoading: false
    },
}

export const Loading: Story = {
    args: {
        isLoading: true
    },
}