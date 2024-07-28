import { StoryFn } from '@storybook/react'

import 'src/app/styles/index.scss'

export const StyleDecorator = (story: () => StoryFn) => story()
