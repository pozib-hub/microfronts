import { EntityState } from '@reduxjs/toolkit'
import { IComment } from 'entities/Comment'

export interface ArticleDetailsCommentsSchema extends EntityState<IComment, IComment["id"]> {
    isLoading?: boolean;
    error?: string;
}
