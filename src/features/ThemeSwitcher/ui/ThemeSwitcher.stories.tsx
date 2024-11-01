import { Meta, StoryObj } from '@storybook/react'

import { Theme } from '@shared/const/them'
import { ThemeDecorator } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { ThemeSwitcher } from './ThemeSwitcher'

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'widget/ThemeSwitcher',
    component: ThemeSwitcher,
}

export default meta

type Story = StoryObj<typeof ThemeSwitcher>;

export const Light: Story = {
    decorators: [CenterDecorator],
}

export const Dark: Story = {
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
