import { Handler } from './core/handler.abstract';
import { OrderRequest } from './core/order-request';
import { AuthHandler } from './handlers/auth.handler';
import { StockHandler } from './handlers/stock.handler';
import { PaymentHandler } from './handlers/payment.handler';
import { FraudHandler } from './handlers/fraud.handler';

function buildChain(): Handler {
    const auth = new AuthHandler();
    const stock = new StockHandler();
    const payment = new PaymentHandler();
    const fraud = new FraudHandler();

    auth.setNext(stock).setNext(payment).setNext(fraud);

    return auth;
}

function processOrder(chain: Handler, request: OrderRequest): void {
    console.log(`\n--- Processing order for "${request.userId}" / ${request.productId} ---`);
    const result = chain.handle(request);
    console.log(result ?? 'No handler processed the request');
}

const chain = buildChain();

processOrder(chain, {
    userId: 'user-1',
    productId: 'IPHONE-15',
    amount: 999,
    isAuthenticated: true,
    inStock: true,
    isFraudulent: false,
});

processOrder(chain, {
    userId: 'user-2',
    productId: 'MACBOOK-PRO',
    amount: 2499,
    isAuthenticated: false,
    inStock: true,
    isFraudulent: false,
});

processOrder(chain, {
    userId: 'user-3',
    productId: 'AIRPODS',
    amount: 199,
    isAuthenticated: true,
    inStock: false,
    isFraudulent: false,
});

processOrder(chain, {
    userId: 'user-4',
    productId: 'IPAD',
    amount: 799,
    isAuthenticated: true,
    inStock: true,
    isFraudulent: true,
});
