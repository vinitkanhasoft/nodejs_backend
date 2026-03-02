import { addNotificationJob } from './notification.queue';
import { NotificationType } from '../enums';

// Define a generic payload interface (customize fields as needed)
export interface NotificationPayload {
  to: string;
  subject?: string;
  message: string;
  [key: string]: unknown; // for extra optional fields
}

export class NotificationService {
  sendEmail(data: NotificationPayload) {
    addNotificationJob(NotificationType.EMAIL, data);
  }

  sendSMS(data: NotificationPayload) {
    addNotificationJob(NotificationType.SMS, data);
  }
}