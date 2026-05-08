import { OrderStore } from './order-store.publisher';
import { EmailObserver } from './observers/email.observer';
import { SmsObserver } from './observers/sms.observer';
import { AnalyticsObserver } from './observers/analytics.observer';

const store = new OrderStore();

const email = new EmailObserver('jan@example.com');
const sms = new SmsObserver('+48 600 000 001');
const analytics = new AnalyticsObserver();

// subscribe each observer to relevant events
store.subscribe('order:placed', email);
store.subscribe('order:placed', sms);
store.subscribe('order:placed', analytics);

store.subscribe('order:shipped', email);
store.subscribe('order:shipped', analytics);

store.subscribe('order:cancelled', email);
store.subscribe('order:cancelled', sms);
store.subscribe('order:cancelled', analytics);

console.log('=== Place order ===\n');
store.placeOrder('ORD-001', 249);

console.log('\n=== Ship order ===\n');
store.shipOrder('ORD-001');

console.log('\n=== Unsubscribe SMS, then cancel ===\n');
store.unsubscribe('order:cancelled', sms);
store.cancelOrder('ORD-001');
