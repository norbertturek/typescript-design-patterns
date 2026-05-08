import { OrderState } from '../core/order-state.interface';
import { Order } from '../order.context';

export class DeliveredState implements OrderState {
    pay(order: Order): void    { console.log('  [!] Already paid'); }
    ship(order: Order): void   { console.log('  [!] Already shipped'); }
    deliver(order: Order): void{ console.log('  [!] Already delivered'); }
    cancel(order: Order): void { console.log('  [!] Cannot cancel — already delivered'); }
    getStatus(): string        { return 'delivered'; }
}
