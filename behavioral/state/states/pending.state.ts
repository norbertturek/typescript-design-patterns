import { OrderState } from '../core/order-state.interface';
import { Order } from '../order.context';
import { ProcessingState } from './processing.state';
import { CancelledState } from './cancelled.state';

export class PendingState implements OrderState {
    pay(order: Order): void    { order.setState(new ProcessingState()); }
    ship(order: Order): void   { console.log('  [!] Cannot ship — order not paid yet'); }
    deliver(order: Order): void{ console.log('  [!] Cannot deliver — order not paid yet'); }
    cancel(order: Order): void { order.setState(new CancelledState()); }
    getStatus(): string        { return 'pending'; }
}
