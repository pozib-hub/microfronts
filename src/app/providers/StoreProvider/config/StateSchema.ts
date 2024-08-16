
import { AxiosInstance } from 'axios'
import { NavigateOptions, To } from 'react-router'
import {
    ActionFromReducer,
    EnhancedStore,
    Reducer,
    ReducerFromReducersMapObject,
    ReducersMapObject,
    StateFromReducersMapObject,
    UnknownAction
} from '@reduxjs/toolkit'

import { ProfileSchema } from 'entities/profile'
import { UserSchema } from 'entities/user'
import { LoginSchema } from 'features/AuthByUsername'
import { GlobalSettingsSchema } from 'entities/globalSettings'



export interface StateSchema {
    globalSettings: GlobalSettingsSchema
    user: UserSchema

    // async reducers
    loginForm?: LoginSchema
}


export interface IReduceManager<State> {
    getReducerMap: () => ReducersMapObject<State>,

    // reducer это функция принимающая state и action и возвращающая новый обновленный state - (state, action) => states
    // reduce: Reducer<State, UnknownAction, State>,
    reduce: (
        s: State | undefined,
        // eslint-disable-next-line max-len
        a: ActionFromReducer<ReducerFromReducersMapObject<ReducersMapObject<State, UnknownAction, State>>>
    ) => StateFromReducersMapObject<ReducersMapObject<State, UnknownAction, State>>
    add: <K extends keyof State>
        (key: K, reducer: Reducer<Exclude<State[K], undefined>>) => void;
    // remove: (key: OnlyOptionalKeys<State>) => void
    remove: (key: keyof State) => void
    isHas: (key: keyof State) => boolean
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: IReduceManager<StateSchema>
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}
