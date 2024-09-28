import { Meta, StoryObj } from '@storybook/react'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { CurrencySelect } from './CurrencySelect'

const meta: Meta<typeof CurrencySelect> = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
}

export default meta

type Story = StoryObj<typeof CurrencySelect>;

export const Primary: Story = {
    args: {

    },
    decorators: [CenterDecorator],
}