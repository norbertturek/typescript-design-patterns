import { Observer } from '../core/observer.interface';
import { OrderEvent } from '../order-store.publisher';

export class EmailObserver implements Observer<OrderEvent> {
    constructor(private readonly email: string) {}

    update(event: string, data: OrderEvent): void {
        console.log(`[Email -> ${this.email}] "${event}" | Order ${data.orderId} is now: ${data.status}`);
    }
}
