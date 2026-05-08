import { Observer } from './core/observer.interface';
import { Subject } from './core/subject.interface';

export type OrderEvent = {
    orderId: string;
    status: string;
    amount?: number;
};

export class OrderStore implements Subject<OrderEvent> {
    private listeners: Map<string, Set<Observer<OrderEvent>>> = new Map();

    subscribe(event: string, observer: Observer<OrderEvent>): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(observer);
    }

    unsubscribe(event: string, observer: Observer<OrderEvent>): void {
        this.listeners.get(event)?.delete(observer);
    }

    notify(event: string, data: OrderEvent): void {
        this.listeners.get(event)?.forEach(observer => observer.update(event, data));
    }

    placeOrder(orderId: string, amount: number): void {
        console.log(`[OrderStore] Order ${orderId} placed ($${amount})`);
        this.notify('order:placed', { orderId, status: 'placed', amount });
    }

    shipOrder(orderId: string): void {
        console.log(`[OrderStore] Order ${orderId} shipped`);
        this.notify('order:shipped', { orderId, status: 'shipped' });
    }

    cancelOrder(orderId: string): void {
        console.log(`[OrderStore] Order ${orderId} cancelled`);
        this.notify('order:cancelled', { orderId, status: 'cancelled' });
    }
}
