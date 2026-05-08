import { OrderState } from '../core/order-state.interface';
import { Order } from '../order.context';
import { ShippedState } from './shipped.state';
import { CancelledState } from './cancelled.state';

export class ProcessingState implements OrderState {
    pay(order: Order): void    { console.log('  [!] Already paid'); }
    ship(order: Order): void   { order.setState(new ShippedState()); }
    deliver(order: Order): void{ console.log('  [!] Cannot deliver — not shipped yet'); }
    cancel(order: Order): void { order.setState(new CancelledState()); }
    getStatus(): string        { return 'processing'; }
}
