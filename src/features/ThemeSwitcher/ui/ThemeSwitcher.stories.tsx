import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { ThemeSwitcher } from './ThemeSwitcher'

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'features/ThemeSwitcher',
    component: ThemeSwitcher,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
}
