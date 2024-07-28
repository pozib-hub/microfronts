import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from 'shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from 'src/app/providers/ThemeProvider'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>;

export const Transparent: Story = {
    args: {
        theme: 'transparent', children: 'Text',
    },
    decorators: [CenterDecorator],
}

export const Outline: Story = {
    args: {
        theme: 'outline',
        children: 'Text',
    },
    decorators: [CenterDecorator],
}

export const OutlineThemeDark: Story = {
    ...Outline,
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
