import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { LanguageSwitcher } from './LanguageSwitcher'

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'widget/LanguageSwitcher',
    component: LanguageSwitcher,
}

export default meta

type Story = StoryObj<typeof LanguageSwitcher>;

export const Base: Story = {
    decorators: [CenterDecorator],
}
