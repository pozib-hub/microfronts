import { lazy, FC } from 'react'

export const ArticlesPageAsync = lazy<FC>(() => import('./ArticlesPage'))
