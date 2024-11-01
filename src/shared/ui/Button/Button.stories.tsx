import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from '@shared/const/them'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Text',
    },
    decorators: [CenterDecorator],
}

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Text',
    },
    decorators: [CenterDecorator],
}

export const DefaultThemeDark: Story = {
    ...Default,
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
