import { Order } from '../order.context';

export interface OrderState {
    pay(order: Order): void;
    ship(order: Order): void;
    deliver(order: Order): void;
    cancel(order: Order): void;
    getStatus(): string;
}
