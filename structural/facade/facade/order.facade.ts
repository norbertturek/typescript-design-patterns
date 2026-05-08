import { IInventoryService } from '../services/inventory.service';
import { IPaymentService } from '../services/payment.service';
import { IShippingService } from '../services/shipping.service';
import { INotificationService } from '../services/notification.service';

export interface IOrderFacade {
    placeOrder(productId: string, amount: number, cardToken: string, address: string, email: string): void;
}

export class OrderFacade implements IOrderFacade {
    constructor(
        private inventory: IInventoryService,
        private payment: IPaymentService,
        private shipping: IShippingService,
        private notification: INotificationService,
    ) {}

    placeOrder(productId: string, amount: number, cardToken: string, address: string, email: string): void {
        console.log('--- Starting order process ---');

        if (!this.inventory.checkStock(productId)) {
            console.log('Order failed: product out of stock');
            return;
        }

        if (!this.payment.charge(amount, cardToken)) {
            console.log('Order failed: payment declined');
            return;
        }

        this.inventory.reserveProduct(productId);
        const trackingId = this.shipping.createShipment(productId, address);
        this.notification.sendConfirmation(email, trackingId);

        console.log('--- Order completed successfully ---');
    }
}
