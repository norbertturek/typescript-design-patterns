import { Order } from './order.context';
import { StandardShipping } from './strategies/standard.strategy';
import { ExpressShipping } from './strategies/express.strategy';
import { StorePickup } from './strategies/pickup.strategy';

const standard = new StandardShipping();
const express = new ExpressShipping();
const pickup = new StorePickup();

console.log('=== Single order, different strategies ===\n');

const order = new Order('ORD-001', 3, 200, standard);
order.printSummary();

order.setStrategy(express);
order.printSummary();

order.setStrategy(pickup);
order.printSummary();

console.log('\n=== Comparing costs for all orders ===\n');

const orders = [
    new Order('ORD-002', 1, 50, standard),
    new Order('ORD-003', 10, 500, standard),
    new Order('ORD-004', 0.5, 10, standard),
];

const strategies = [standard, express, pickup];

for (const o of orders) {
    for (const s of strategies) {
        o.setStrategy(s);
        o.printSummary();
    }
    console.log('');
}
