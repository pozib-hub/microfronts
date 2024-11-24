import { Theme } from '@shared/const/theme'

export interface IUserSettings {
    theme: Theme
    isFirstVisit: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserSettingsSchema extends IUserSettings {}
