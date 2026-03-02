export interface NotificationPayload {
  to: string;
  subject?: string;
  message: string;
  template?: string;
}