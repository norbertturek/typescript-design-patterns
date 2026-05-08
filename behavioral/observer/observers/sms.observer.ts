import { Observer } from '../core/observer.interface';
import { OrderEvent } from '../order-store.publisher';

export class SmsObserver implements Observer<OrderEvent> {
    constructor(private readonly phone: string) {}

    update(event: string, data: OrderEvent): void {
        console.log(`[SMS -> ${this.phone}] "${event}" | Order ${data.orderId}: ${data.status}`);
    }
}
