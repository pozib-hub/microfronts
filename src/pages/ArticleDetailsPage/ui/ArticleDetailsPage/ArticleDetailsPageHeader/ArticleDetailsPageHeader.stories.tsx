import { Meta, StoryObj } from '@storybook/react'

import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'
import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof ArticleDetailsPageHeader> = {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
}

export default meta

type Story = StoryObj<typeof ArticleDetailsPageHeader>

export const CantEdit: Story = {
    args: {},
    decorators: [StoreDecorator({})],
}

export const CanEdit: Story = {
    args: {},
    decorators: [StoreDecorator({
        user: {
            authData: {
                id: "1"
            },
        },
        articleDetails: {
            data: {
                user: {
                    id: "1",
                }
            }
        }
    })],
}