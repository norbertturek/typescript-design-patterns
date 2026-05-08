import { Mediator } from './core/mediator.interface';
import { StockComponent } from './components/stock.component';
import { PaymentComponent } from './components/payment.component';
import { NotificationComponent } from './components/notification.component';

export class OrderMediator implements Mediator {
    private stock: StockComponent;
    private payment: PaymentComponent;
    private notification: NotificationComponent;

    private currentOrder: { productId: string; amount: number; cardToken: string; email: string } | null = null;

    constructor() {
        this.stock = new StockComponent(this);
        this.payment = new PaymentComponent(this);
        this.notification = new NotificationComponent();
    }

    placeOrder(productId: string, amount: number, cardToken: string, email: string): void {
        console.log(`\n[Mediator] Starting order: ${productId} for ${email}`);
        this.currentOrder = { productId, amount, cardToken, email };
        this.stock.checkAndReserve(productId);
    }

    notify(sender: string, event: string, data?: unknown): void {
        const order = this.currentOrder!;

        if (sender === 'Stock' && event === 'reserved') {
            this.payment.charge(order.amount, order.cardToken);
        }

        if (sender === 'Stock' && event === 'outOfStock') {
            this.notification.sendOutOfStock(order.email, order.productId);
        }

        if (sender === 'Payment' && event === 'charged') {
            this.notification.sendConfirmation(order.email, order.productId);
            console.log(`[Mediator] Order completed successfully`);
        }

        if (sender === 'Payment' && event === 'declined') {
            this.notification.sendPaymentFailed(order.email);
            console.log(`[Mediator] Order failed — payment declined`);
        }
    }
}
