import Queue from 'bull';
import { NotificationType } from '../enums';
import { NotificationPayload } from './notification.service'; // import the payload type

export const notificationQueue = new Queue('notification');

// Use generic or typed payload instead of any
export const addNotificationJob = (type: NotificationType, data: NotificationPayload) => {
  notificationQueue.add({ type, data });
};