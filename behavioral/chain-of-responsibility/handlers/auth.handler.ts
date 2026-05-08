import { AbstractHandler } from '../core/handler.abstract';
import { OrderRequest } from '../core/order-request';

export class AuthHandler extends AbstractHandler {
    handle(request: OrderRequest): string | null {
        if (!request.isAuthenticated) {
            return `[AuthHandler] BLOCKED: user "${request.userId}" is not authenticated`;
        }
        console.log(`[AuthHandler] OK — user authenticated`);
        return super.handle(request);
    }
}
