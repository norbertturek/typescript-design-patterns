import { AbstractHandler } from '../core/handler.abstract';
import { OrderRequest } from '../core/order-request';

export class StockHandler extends AbstractHandler {
    handle(request: OrderRequest): string | null {
        if (!request.inStock) {
            return `[StockHandler] BLOCKED: product "${request.productId}" is out of stock`;
        }
        console.log(`[StockHandler] OK — product in stock`);
        return super.handle(request);
    }
}
