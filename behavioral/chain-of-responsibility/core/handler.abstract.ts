import { OrderRequest } from './order-request';

export interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: OrderRequest): string | null;
}

export abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: OrderRequest): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
