import { rtkApi } from "@shared/api/rtkApi"
import { IUserSettings } from "../model/types/userSettings"

interface IParams {
    key: string;
}

type IProps = {
    [K in keyof IUserSettings]: { key: K; value: NonNullable<IUserSettings[K]> }
}[keyof IUserSettings]

const userSettingsApi = rtkApi.injectEndpoints({
    endpoints: builder => ({
        getUserSetting: builder.query<IProps, IParams>({
            query: (params) => ({
                url: `/userSettings`,
                params,
            }),
        }),
        setUserSetting:
            builder.mutation<IProps, IProps>({
                query: (props) => ({
                    url: `/userSettings/` + props.key,
                    method: "PATCH",
                    body: {
                        value: props.value
                    },
                }),
            }),
    }),
})

export const setUserSettingMutation = userSettingsApi.endpoints.setUserSetting.initiate
export const getUserSettingQuery = userSettingsApi.endpoints.getUserSetting.initiate


export const useUserSettingsApi
    = userSettingsApi.useGetUserSettingQuery

export const useSetUserSettingsApi
    = userSettingsApi.useSetUserSettingMutation