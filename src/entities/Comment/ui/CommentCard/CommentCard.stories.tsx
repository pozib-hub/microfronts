import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from 'shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from 'src/app/providers/ThemeProvider'
import { CommentCard } from './CommentCard'

const meta: Meta<typeof CommentCard> = {
    title: 'entities/CommentCard',
    component: CommentCard,
}

export default meta

type Story = StoryObj<typeof CommentCard>;


export const Default: Story = {
    args: {},
    decorators: [CenterDecorator],
}

export const Primary: Story = {
    args: {},
    decorators: [CenterDecorator],
}

export const DefaultThemeDark: Story = {
    ...Default,
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
