import { AbstractHandler } from '../core/handler.abstract';
import { OrderRequest } from '../core/order-request';

export class FraudHandler extends AbstractHandler {
    handle(request: OrderRequest): string | null {
        if (request.isFraudulent) {
            return `[FraudHandler] BLOCKED: fraudulent activity detected for user "${request.userId}"`;
        }
        console.log(`[FraudHandler] OK — no fraud detected`);
        return '✅ Order approved!';
    }
}
