import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@shared/const/them'
import NotFoundPage from './NotFoundPage'

const meta: Meta<typeof NotFoundPage> = {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
}

export default meta

type Story = StoryObj<typeof NotFoundPage>;

export const LightTheme: Story = {
}

export const DarkTheme: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
