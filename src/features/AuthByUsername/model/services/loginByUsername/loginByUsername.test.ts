import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { userActions } from 'entities/user'

import { loginByUsername } from './loginByUsername'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

jest.mock('axios', () => {
    return {
        post: jest.fn(),
        get: jest.fn(),
        // create: () => {
        //     return {
        //         interceptors: {
        //             request: { eject: jest.fn(), use: jest.fn() },
        //             response: { eject: jest.fn(), use: jest.fn() },
        //         },
        //     }
        // },
    }
})

axios.create = jest.fn(() => axios)

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('loginByUsername.test', () => {
    // let dispatch: Dispatch
    // let getState: () => StateSchema

    // beforeEach(() => {
    //     dispatch = jest.fn()
    //     getState = jest.fn()
    // })

    // test('success login', async () => {
    //     const userValues = {
    //         username: "admin",
    //         id: "1"
    //     }

    //     mockedAxios.post.mockResolvedValue(Promise.resolve({ data: userValues }))

    //     const action = loginByUsername({
    //         password: "admin",
    //         username: "admin"
    //     })

    //     const result = await action(dispatch, getState, undefined)

    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValues))
    //     expect(dispatch).toHaveBeenCalledTimes(3)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/login', {
    //         username: 'admin',
    //         password: 'admin'
    //     })
    //     expect(result.meta.requestStatus).toBe("fulfilled")
    //     expect(result.payload).toEqual(userValues)
    // })

    // test('403 login', async () => {
    //     mockedAxios.post.mockResolvedValue(Promise.resolve({ status: 403 }))

    //     const action = loginByUsername({
    //         password: "123",
    //         username: "123"
    //     })

    //     const result = await action(dispatch, getState, undefined)

    //     expect(dispatch).toHaveBeenCalledTimes(2)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe("rejected")
    // })



    test('success login', async () => {
        const userValues = {
            username: "admin",
            id: "1"
        }

        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockResolvedValue(Promise.resolve({ data: userValues }))

        const result = await thunk.callThunk({
            password: "admin",
            username: "admin"
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValues))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        // expect(mockedAxios.post).toHaveBeenCalled()
        expect(thunk.api.post).toHaveBeenCalled()
        expect(thunk.api.post).toHaveBeenCalledWith('login', {
            username: 'admin',
            password: 'admin'
        })
        expect(result.meta.requestStatus).toBe("fulfilled")
        expect(result.payload).toEqual(userValues)
    })

    test('403 login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockResolvedValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk({
            password: "admin",
            username: "admin"
        })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe("rejected")
    })

})
