import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from '@shared/const/them'
import { AppLink } from './AppLink'

const meta: Meta<typeof AppLink> = {
    args: {
        to: '',
        children: 'Text',
    },
    title: 'shared/AppLink',
    component: AppLink,
}

export default meta

type Story = StoryObj<typeof AppLink>;

export const PrimaryThemeLight: Story = {
    args: {
        variant: 'primary',
    },
    decorators: [CenterDecorator],
}

export const SecondaryThemeLight: Story = {
    args: {
        variant: 'secondary',
    },
    decorators: [CenterDecorator],
}

export const PrimaryThemeDark: Story = {
    args: {
        variant: 'primary',
    },
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}

export const SecondaryThemeDark: Story = {
    args: {
        variant: 'secondary',
    },
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
