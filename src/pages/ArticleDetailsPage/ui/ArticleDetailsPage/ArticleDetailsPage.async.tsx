import { FC, lazy } from 'react'

export const ArticleDetailsPageAsync = lazy<FC>(() => import('./ArticleDetailsPage'))
