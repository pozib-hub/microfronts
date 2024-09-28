import React, { FC, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { Reducer } from '@reduxjs/toolkit'

import { ReduxStoreWithManager, StateSchema } from '@app/providers/StoreProvider'

export type ReducersList = {
    [name in keyof StateSchema]?: Reducer<Exclude<StateSchema[name], undefined>>
}

interface IDynamicModuleLoaderProps {
    children: React.ReactNode,
    reducers: ReducersList
    shouldAfterUnmount?: boolean
}
export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        shouldAfterUnmount = true,
    } = props

    const dispatch = useDispatch()
    const store = useStore() as ReduxStoreWithManager

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!store.reducerManager.isHas(name as keyof StateSchema)) {
                store.reducerManager.add(
                    name as keyof StateSchema,
                    reducer as Reducer<Exclude<StateSchema[keyof StateSchema], undefined>>
                )
                dispatch({ type: `@INIT ${name} reducer` })
            }
        })

        return () => {
            if (shouldAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as keyof StateSchema)
                    dispatch({ type: `@DESTROY ${name} reducer` })
                })
            }
        }
    }, [shouldAfterUnmount, dispatch, reducers, store.reducerManager])

    return children
}
