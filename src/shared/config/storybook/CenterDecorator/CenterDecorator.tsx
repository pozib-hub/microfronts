import { StoryFn } from '@storybook/react'

import styles from './CenterDecorator.module.scss'

export const CenterDecorator = (Story: StoryFn) => (
    <div className={styles.center}>
        <Story />
    </div>
)
