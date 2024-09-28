import { rtkApi } from "@shared/api/rtkApi"
import { INotification } from "../model/types/Notification"

const notificationApi = rtkApi.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query<INotification[], null>({
            query: () => ({ url: `/notifications` }),
        }),
    }),
})

export const useNotifications
    = notificationApi.useGetNotificationsQuery