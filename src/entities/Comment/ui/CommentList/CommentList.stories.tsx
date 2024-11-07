import { Meta, StoryObj } from '@storybook/react'

import { CommentList } from './CommentList'

const meta: Meta<typeof CommentList> = {
    title: 'entities/CommentList',
    component: CommentList,
}

export default meta

type Story = StoryObj<typeof CommentList>;

export const Normal: Story = {
    args: {
        comments: [
            {
                articleId: "1",
                id: "1",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, culpa quod ut facilis voluptatum harum voluptatem eligendi, sequi obcaecati iure cum laborum quae nostrum maiores corrupti, tempora quas neque ea.",
                user: {
                    id: "1",
                    username: "John Doe",
                    avatar: "https://example.com/avatar.jpg"
                }
            },
            {
                articleId: "1",
                id: "2",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, culpa quod ut facilis voluptatum harum voluptatem eligendi, sequi obcaecati iure cum laborum quae nostrum maiores corrupti, tempora quas neque ea.",
                user: {
                    id: "1",
                    username: "John Doe",
                    avatar: "https://example.com/avatar.jpg"
                }
            },
            {
                articleId: "1",
                id: "3",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, culpa quod ut facilis voluptatum harum voluptatem eligendi, sequi obcaecati iure cum laborum quae nostrum maiores corrupti, tempora quas neque ea.",
                user: {
                    id: "1",
                    username: "John Doe",
                    avatar: "https://example.com/avatar.jpg"
                }
            }
        ],
        isLoading: false
    },
}

export const Loading: Story = {
    args: {
        isLoading: true
    },
}