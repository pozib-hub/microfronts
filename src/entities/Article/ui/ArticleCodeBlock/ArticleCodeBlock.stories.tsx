import { Meta, StoryObj } from '@storybook/react'

import { ArticleCodeBlock } from './ArticleCodeBlock'

const meta: Meta<typeof ArticleCodeBlock> = {
    title: 'entities/Article/ArticleCodeBlock',
    component: ArticleCodeBlock,
}

export default meta

type Story = StoryObj<typeof ArticleCodeBlock>;

export const Default: Story = {
    args: {
        block: {
            id: "4",
            type: "CODE",
            code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\"hello\"></p>\n\n    <script>\n      document.getElementById(\"hello\").innerHTML = \"Hello, world!\";\n    </script>\n  </body>\n</html>;"
        }
    },
}

