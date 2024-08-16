import { combineReducers, ReducersMapObject } from '@reduxjs/toolkit'

import { IReduceManager } from './StateSchema'


export function createReducerManager<State>(
    initialReducers: ReducersMapObject<State>,
): IReduceManager<State> {
    // Create an object which maps keys to reducers
    const reducers = { ...initialReducers }

    // Create the initial combinedReducer
    let combinedReducer = combineReducers(reducers)

    // An array which is used to delete state  keys when reducers are removed
    let keysToRemove: Array<keyof State> = []

    return {
        getReducerMap: () => reducers,

        // The root reducer function exposed by this object
        // This will be passed to the store
        reduce: (state, action) => {
            // If any reducers have been removed, clean up their state first

            if (state === undefined) {
                state = {} as State
            }

            if (keysToRemove.length > 0) {
                const newState = { ...state }

                keysToRemove.forEach((key) => {
                    delete newState[key]
                })

                keysToRemove = []
                state = newState
            }

            // Delegate to the combined reducer
            return combinedReducer(state as any, action as any)
        },

        // Adds a new reducer with the specified key
        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return
            }

            // Add the reducer to the reducer mapping
            reducers[key] = reducer as any

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        },

        // Removes a reducer with the specified key
        remove: (key) => {
            if (!key || !reducers[key]) {
                return
            }

            // Remove it from the reducer mapping
            delete reducers[key]

            // Add the key to the list of keys to clean up
            keysToRemove.push(key)

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        },
        isHas: (key) => Boolean(reducers[key]),
    }
}
