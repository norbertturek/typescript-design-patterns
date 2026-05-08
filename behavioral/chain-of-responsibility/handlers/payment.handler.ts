import { AbstractHandler } from '../core/handler.abstract';
import { OrderRequest } from '../core/order-request';

export class PaymentHandler extends AbstractHandler {
    handle(request: OrderRequest): string | null {
        if (request.amount <= 0) {
            return `[PaymentHandler] BLOCKED: invalid amount ${request.amount}`;
        }
        console.log(`[PaymentHandler] OK — amount ${request.amount} is valid`);
        return super.handle(request);
    }
}
