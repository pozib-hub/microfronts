import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from 'shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from 'src/app/providers/ThemeProvider'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
}

export default meta

type Story = StoryObj<typeof Input>;

export const InputDefault: Story = {
    args: {
        label: 'label',
        value: 'text',
    },
    decorators: [CenterDecorator],
}

export const InputFilled: Story = {
    args: {
        label: 'label',
        variant: 'filled',
        value: 'text',
    },
    decorators: [CenterDecorator],
}

export const InputOutline: Story = {
    args: {
        label: 'label',
        variant: 'outline',
        value: 'text',
    },
    decorators: [CenterDecorator],
}

export const InputThemeDark: Story = {
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
