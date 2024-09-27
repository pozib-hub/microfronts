
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// import { IAdminPanelSchema } from '../types/'
// import builderReducersByProject from 'utils/builderReducersByProject'
// import { fetchAdminPanel } from '../services/fetchAdminPanel'

// const initialState: AdminPanelSchema = {
//     data: undefined,
//     isLoading: false,
//     error: undefined,
// }

// export const AdminPanelSlice = createSlice({
//     name: 'AdminPanel',
//     initialState,
//     reducers: {
//         setData: (state, action: PayloadAction<>) => {
//             state.data = action.payload
//         },
//         clearData: () => initialState
//     },
//     /* extraReducers: (builder) => {
//         builderReducersByProject(builder)?.addCase(
//             .pending, (state) => {
//                 state.isLoading = true
//                 state.error = undefined
//             })
//             .addCase(.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.error = undefined
//                 state.data = action.payload
//             })
//             .addCase(.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.error = action.payload
//             })
//         }
//     */
// })

// export const { actions: AdminPanelActions } = AdminPanelSlice
// export const { reducer: AdminPanelReducer } = AdminPanelSlice
