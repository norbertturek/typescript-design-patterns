export interface INotificationService {
    sendConfirmation(email: string, trackingId: string): void;
}

export class NotificationService implements INotificationService {
    sendConfirmation(email: string, trackingId: string): void {
        console.log(`[NOTIFICATION] Sending confirmation to ${email}. Tracking: ${trackingId}`);
    }
}
