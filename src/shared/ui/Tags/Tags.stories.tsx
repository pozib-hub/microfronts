

import { Meta, StoryObj } from '@storybook/react'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Tags } from './Tags'

const meta: Meta<typeof Tags> = {
    title: 'shared/Tags',
    component: Tags,
}

export default meta

type Story = StoryObj<typeof Tags>;

export const SingleSimpleValue: Story = {
    args: {
        isMulti: false,
        tags: [
            { label: "Bug", value: "bug" },
            { label: "Feature Request", value: "feature-request" },
            { label: "Documentation", value: "documentation" },
            { label: "Improvement", value: "improvement" }
        ],
        value: "feature-request",
        onChange: () => { },
    },
    decorators: [CenterDecorator],
}

export const SingleObjectValue: Story = {
    argTypes: {
        value: {
            label: "string",
            value: {
                type: "string"
            }
        },
        tags: [{}],
        // fieldCompareValue: ""
    },

    args: {
        isMulti: false,
        tags: [
            { label: "Bug", value: { type: "bug" } },
            { label: "Feature Request", value: { type: "feature-request" } },
            { label: "Documentation", value: { type: "documentation" } },
            { label: "Improvement", value: { type: "improvement" } }
        ],
        value: { label: "Feature Request", value: { type: "feature-request" } },
        // fieldCompareValue: 'type',
        onChange: () => { },
    },
    decorators: [CenterDecorator],
}






