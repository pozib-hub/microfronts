

const templateServiceFetch = (nameSlice, nameService) => `
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/providers/StoreProvider'
import parseApiErrors from '@shared/api/parseApiErrors'

interface IFetch${nameService}Props {
}

export const fetch${nameService} = createAsyncThunk<
    void,
    IFetch${nameService}Props,
    ThunkConfig<string>
>(
    '${nameSlice}/fetch${nameService}',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi

        const {
        } = getState() || {}

        const params = {}

        try {
            const response = await extra.api.get<>('', {
                params
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            return rejectWithValue(parseApiErrors(error))
        }
    },
)`

const templateSlice = (name) => `
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import builderReducersByProject from '@utils/builderReducersByProject'
import { I${name}Schema } from '../types/'
import { fetch${name} } from '../services/fetch${name}'

const initialState: ${name}Schema = {
    data: undefined,
    isLoading: false,
    error: undefined,
}

export const ${name}Slice = createSlice({
    name: '${name}',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<>) => {
            state.data = action.payload
        },
        clearData: () => initialState
    },
    /* extraReducers: (builder) => {
        builderReducersByProject(builder)?.addCase(
            .pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
            })
            .addCase(.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
        }
    */
})

export const { actions: ${name}Actions } = ${name}Slice
export const { reducer: ${name}Reducer } = ${name}Slice
`

const templateTypeSchema = (name) => `export interface I${name}Schema {
    
}`

const templateComponent = (name) => `
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import cn from '@shared/lib/classNames/classNames';

import styles from './${name}.module.scss';

interface I${name}Props {
    className?: string;
}

export const ${name} = memo((props: I${name}Props) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={cn(styles.wrapper, className)}>
           
        </div>
    );
});`

const templateStyle = (name) => `.wrapper {
}
`

const templateStory = (name) => ``

const templatePublicApi = (name) => `


`

module.exports = {
    templateServiceFetch,
    templateSlice,
    templateTypeSchema,
    templateStyle,
    templateComponent,
    templateStory,
}