import { Order } from './order.context';

const order = new Order('ORD-001');

console.log('=== Happy path ===\n');
console.log(`Status: ${order.getStatus()}`);
order.pay();
console.log(`Status: ${order.getStatus()}`);
order.ship();
console.log(`Status: ${order.getStatus()}`);
order.deliver();
console.log(`Status: ${order.getStatus()}`);

console.log('\n=== Invalid transitions ===\n');
order.cancel();   // already delivered
order.deliver();  // already delivered

const order2 = new Order('ORD-002');
console.log('\n=== Cancel before payment ===\n');
console.log(`Status: ${order2.getStatus()}`);
order2.ship();    // not paid yet
order2.cancel();
console.log(`Status: ${order2.getStatus()}`);
order2.pay();     // already cancelled
