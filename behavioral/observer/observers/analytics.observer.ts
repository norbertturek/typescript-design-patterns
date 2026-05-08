import { Observer } from '../core/observer.interface';
import { OrderEvent } from '../order-store.publisher';

export class AnalyticsObserver implements Observer<OrderEvent> {
    private log: { event: string; data: OrderEvent }[] = [];

    update(event: string, data: OrderEvent): void {
        this.log.push({ event, data });
        const amount = data.amount ? ` | $${data.amount}` : '';
        console.log(`[Analytics] Recorded "${event}"${amount} (total events: ${this.log.length})`);
    }
}
