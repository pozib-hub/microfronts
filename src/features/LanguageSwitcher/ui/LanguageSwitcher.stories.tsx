import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { LanguageSwitcher } from './LanguageSwitcher'

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'features/LanguageSwitcher',
    component: LanguageSwitcher,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof LanguageSwitcher>;

export const Base: Story = {}
