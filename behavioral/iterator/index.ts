import { OrderQueue } from './collection/order-queue';
import { Iterator } from './core/iterator.interface';
import { Order } from './core/order';

function printAll(label: string, iterator: Iterator<Order>): void {
    console.log(`\n--- ${label} ---`);
    while (iterator.hasNext()) {
        const order = iterator.next();
        console.log(`  [priority ${order.priority}] ${order.id}: ${order.product}`);
    }
}

const queue = new OrderQueue();

queue.add({ id: 'ORD-1', product: 'iPhone 15', priority: 3 });
queue.add({ id: 'ORD-2', product: 'MacBook Pro', priority: 10 });
queue.add({ id: 'ORD-3', product: 'AirPods', priority: 1 });
queue.add({ id: 'ORD-4', product: 'iPad', priority: 7 });
queue.add({ id: 'ORD-5', product: 'Apple Watch', priority: 5 });

printAll('Ascending (low → high priority)', queue.createAscendingIterator());
printAll('Descending (high → low priority, VIP first)', queue.createDescendingIterator());

console.log('\n--- Parallel iteration (two independent iterators) ---');
const iter1 = queue.createAscendingIterator();
const iter2 = queue.createDescendingIterator();

iter1.next(); // skip first
const fromIter1 = iter1.next();
const fromIter2 = iter2.next();

console.log(`iter1 position 2: [${fromIter1.priority}] ${fromIter1.product}`);
console.log(`iter2 position 1: [${fromIter2.priority}] ${fromIter2.product}`);
console.log('→ both iterators are independent, collection unchanged');
