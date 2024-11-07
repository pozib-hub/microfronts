import { Meta, StoryObj } from '@storybook/react'

import { ArticleImageBlock } from './ArticleImageBlock'

const meta: Meta<typeof ArticleImageBlock> = {
    title: 'entities/Article/ArticleImageBlock',
    component: ArticleImageBlock,
}

export default meta

type Story = StoryObj<typeof ArticleImageBlock>;

export const Default: Story = {
    args: {
        block: {
            id: "5",
            type: "IMAGE",
            title: "Рисунок 1 - скриншот сайта",
            src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png"
        }

    },
}

