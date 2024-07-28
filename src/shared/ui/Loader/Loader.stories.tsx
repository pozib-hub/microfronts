import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from 'shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from 'src/app/providers/ThemeProvider'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
    title: 'shared/Loader',
    component: Loader,
}

export default meta

type Story = StoryObj<typeof Loader>;

export const LoaderThemeLight: Story = {
    decorators: [CenterDecorator],
}

export const LoaderThemeDark: Story = {
    decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
}
