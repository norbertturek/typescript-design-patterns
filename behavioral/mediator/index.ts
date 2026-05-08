import { OrderMediator } from './order.mediator';

const mediator = new OrderMediator();

mediator.placeOrder('IPHONE-15', 999, 'tok_valid_visa', 'user1@example.com');
mediator.placeOrder('AIRPODS', 199, 'tok_valid_visa', 'user2@example.com');
mediator.placeOrder('MACBOOK-PRO', 2499, 'tok_declined', 'user3@example.com');
