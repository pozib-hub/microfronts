import { StoryFn } from '@storybook/react'

import { Theme } from 'src/app/providers/ThemeProvider'

import 'app/styles/index.scss'

export const ThemeDecorator = (theme: Theme = Theme.LIGHT) => (Story: StoryFn) => (
    <div className={`app ${theme}`}>
        <Story />
    </div>
)
