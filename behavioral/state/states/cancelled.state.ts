import { OrderState } from '../core/order-state.interface';
import { Order } from '../order.context';

export class CancelledState implements OrderState {
    pay(order: Order): void    { console.log('  [!] Order is cancelled'); }
    ship(order: Order): void   { console.log('  [!] Order is cancelled'); }
    deliver(order: Order): void{ console.log('  [!] Order is cancelled'); }
    cancel(order: Order): void { console.log('  [!] Already cancelled'); }
    getStatus(): string        { return 'cancelled'; }
}
