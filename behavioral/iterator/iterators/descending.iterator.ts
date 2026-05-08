import { Iterator } from '../core/iterator.interface';
import { Order } from '../core/order';

export class DescendingIterator implements Iterator<Order> {
    private sorted: Order[];
    private position: number = 0;

    constructor(orders: Order[]) {
        this.sorted = [...orders].sort((a, b) => b.priority - a.priority);
    }

    hasNext(): boolean {
        return this.position < this.sorted.length;
    }

    next(): Order {
        return this.sorted[this.position++];
    }
}
