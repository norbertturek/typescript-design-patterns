import { IterableCollection } from '../core/iterable-collection.interface';
import { Iterator } from '../core/iterator.interface';
import { Order } from '../core/order';
import { AscendingIterator } from '../iterators/ascending.iterator';
import { DescendingIterator } from '../iterators/descending.iterator';

export class OrderQueue implements IterableCollection<Order> {
    private orders: Order[] = [];

    add(order: Order): void {
        this.orders.push(order);
    }

    createAscendingIterator(): Iterator<Order> {
        return new AscendingIterator(this.orders);
    }

    createDescendingIterator(): Iterator<Order> {
        return new DescendingIterator(this.orders);
    }
}
