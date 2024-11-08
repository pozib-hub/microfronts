import { Meta, StoryObj } from '@storybook/react'

import ForbiddenPage from './ForbiddenPage'

const meta: Meta<typeof ForbiddenPage> = {
    title: 'pages/ForbiddenPage',
    component: ForbiddenPage,
}

export default meta

type Story = StoryObj<typeof ForbiddenPage>

export const Default: Story = {
    args: {},
}
