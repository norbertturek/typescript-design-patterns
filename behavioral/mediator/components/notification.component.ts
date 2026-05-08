export class NotificationComponent {
    sendConfirmation(email: string, productId: string): void {
        console.log(`[Notification] Confirmation sent to "${email}" for "${productId}"`);
    }

    sendOutOfStock(email: string, productId: string): void {
        console.log(`[Notification] Out-of-stock alert sent to "${email}" for "${productId}"`);
    }

    sendPaymentFailed(email: string): void {
        console.log(`[Notification] Payment failure alert sent to "${email}"`);
    }
}
