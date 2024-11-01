import { StoryFn } from '@storybook/react'

import { ThemeProvider } from '@app/providers/ThemeProvider'
import { Theme } from '@shared/const/them'

import '@app/styles/index.scss'

export const ThemeDecorator = (theme: Theme = Theme.LIGHT) =>
    function cb(Story: StoryFn) {
        return <ThemeProvider>
            <div className={`app ${theme}`}>
                <Story />
            </div>
        </ThemeProvider>
    }
