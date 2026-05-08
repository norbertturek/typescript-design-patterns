import { OrderState } from '../core/order-state.interface';
import { Order } from '../order.context';
import { DeliveredState } from './delivered.state';

export class ShippedState implements OrderState {
    pay(order: Order): void    { console.log('  [!] Already paid'); }
    ship(order: Order): void   { console.log('  [!] Already shipped'); }
    deliver(order: Order): void{ order.setState(new DeliveredState()); }
    cancel(order: Order): void { console.log('  [!] Cannot cancel — already shipped'); }
    getStatus(): string        { return 'shipped'; }
}
