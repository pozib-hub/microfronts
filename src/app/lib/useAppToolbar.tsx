import { useLocation, matchPath } from 'react-router-dom'

import { ScrollToolbar } from '@widgets/ScrollToolbar'
import { routePath } from '@shared/const/router'

const pagesWithScrollToolbar = [routePath.articles, routePath.articleDetail(':id')]

export function useAppToolbar() {
    const { pathname } = useLocation()

    let isReturnScrollToolbar = false

    pagesWithScrollToolbar.forEach((patternPath) => {
        if (matchPath(patternPath, pathname)) {
            isReturnScrollToolbar = true
        }
    })

    if (isReturnScrollToolbar) {
        return <ScrollToolbar />
    }

    return undefined
}
