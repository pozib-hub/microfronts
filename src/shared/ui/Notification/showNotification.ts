import { INotification } from './Notification'
import NotificationManager from './NotificationManager'

export const showNotification = (notification: INotification) => {
    NotificationManager.create(notification)
}
