import { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

import { articlesPageReducer } from '../../models/slice/ArticlesPageSlice'
import ArticlesPage from './ArticlesPage'

const meta: Meta<typeof ArticlesPage> = {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
}

export default meta

type Story = StoryObj<typeof ArticlesPage>

export const Base: Story = {
    decorators: [
        StoreDecorator(
            {
                articlesPage: {
                    isLoading: false,
                    ids: [],
                },
            },
            { articlesPage: articlesPageReducer },
        ),
    ],
}

export const LoadingViewTiles: Story = {
    decorators: [
        StoreDecorator(
            {
                articlesPage: {
                    isLoading: true,
                    ids: [],
                    view: 'tiles',
                    entities: {},
                },
            },
            { articlesPage: articlesPageReducer },
        ),
    ],
}

export const LoadingViewList: Story = {
    decorators: [
        StoreDecorator(
            {
                articlesPage: {
                    isLoading: true,
                    ids: [],
                    view: 'list',
                    entities: {},
                },
            },
            { articlesPage: articlesPageReducer },
        ),
    ],
}

export const Data: Story = {
    decorators: [
        StoreDecorator(
            {
                articlesPage: {
                    isLoading: false,
                    ids: ['1', '2', '3'],
                    view: 'list',
                    entities: {
                        '1': {
                            id: '1',
                            title: 'Article 1',
                            subtitle: 'Subtitle 1',
                            img: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
                            views: 100,
                            createdAt: '2022-01-01',
                            type: [],
                            blocks: [],
                            user: {
                                id: '1',
                                avatar: 'https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png',
                            },
                        },
                        '2': {
                            id: '1',
                            title: 'Article 1',
                            subtitle: 'Subtitle 1',
                            img: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
                            views: 100,
                            createdAt: '2022-01-01',
                            type: [],
                            blocks: [],
                            user: {
                                id: '1',
                                avatar: 'https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png',
                            },
                        },
                        '3': {
                            id: '1',
                            title: 'Article 1',
                            subtitle: 'Subtitle 1',
                            img: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
                            views: 100,
                            createdAt: '2022-01-01',
                            type: [],
                            blocks: [],
                            user: {
                                id: '1',
                                avatar: 'https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png',
                            },
                        },
                    },
                },
            },
            { articlesPage: articlesPageReducer },
        ),
    ],
}
