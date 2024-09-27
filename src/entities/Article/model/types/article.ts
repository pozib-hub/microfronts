import { IUser } from "entities/user"
import { ArticleType } from "../consts/consts"

interface IBaseBlock {
    id: string
    type: "CODE" | "IMAGE" | "TEXT"
}

export interface ICodeBlock extends IBaseBlock {
    code: string
    type: "CODE"
}

export interface IImageBlock extends IBaseBlock {
    src: string
    type: "IMAGE"
    title: string
}

export interface ITextBlock extends IBaseBlock {
    paragraphs: string[]
    type: "TEXT"
    title?: string
}
export type ArticleBlock = ICodeBlock | IImageBlock | ITextBlock

export interface IArticle {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: ArticleType[]
    blocks: ArticleBlock[]
    user: IUser | null
}

export type ArticleFilters = {
    type: ArticleType[]
}

export interface ArticleDetailsSchema {
    isLoading: boolean
    error?: string
    data?: IArticle
}
