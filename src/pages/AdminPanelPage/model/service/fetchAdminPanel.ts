
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { ThunkConfig } from 'app/providers/StoreProvider'
// import parseApiErrors from 'shared/api/parseApiErrors'

// interface IFetchAdminPanelProps {
// }

// export const fetchAdminPanel = createAsyncThunk<
//     void,
//     IFetchAdminPanelProps,
//     ThunkConfig<string>
// >(
//     'AdminPanelPage/fetchAdminPanel',
//     async (props, thunkApi) => {
//         const { extra, rejectWithValue, getState } = thunkApi

//         const {
//         } = getState() || {}

//         const params = {}

//         try {
//             const response = await extra.api.get<"admin/">('', {
//                 params
//             })

//             if (!response.data) {
//                 throw new Error()
//             }

//             return response.data
//         } catch (error) {
//             return rejectWithValue(parseApiErrors(error))
//         }
//     },
// )