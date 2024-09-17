import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import axios, { AxiosStatic } from 'axios'

type ActionCreatorThunk<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios', () => {
    return {
        post: jest.fn(),
        get: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
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
const mockedAxios = axios as jest.MockedFunctionDeep<typeof axios>


export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: Dispatch
    getState: () => StateSchema
    actionCreator: ActionCreatorThunk<Return, Arg, RejectedValue>
    api: jest.MockedFunctionDeep<AxiosStatic>
    // navigate: jest.MockedFunction<any>

    constructor(
        actionCreator: ActionCreatorThunk<Return, Arg, RejectedValue>,
        state?: PartialDeep<StateSchema>
    ) {
        this.actionCreator = actionCreator
        this.dispatch = jest.fn()
        this.getState = jest.fn(() => state as StateSchema)
        this.api = mockedAxios
        // this.navigate = jest.fn()
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg)

        const result = action(
            this.dispatch,
            this.getState,
            {
                api: this.api,
                // navigate: this.navigate
            }
        )

        return result
    }
}