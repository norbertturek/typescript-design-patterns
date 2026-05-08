import { Mediator } from '../core/mediator.interface';

export class StockComponent {
    private stock: Map<string, number> = new Map([
        ['IPHONE-15', 5],
        ['MACBOOK-PRO', 2],
        ['AIRPODS', 0],
    ]);

    constructor(private mediator: Mediator) {}

    checkAndReserve(productId: string): boolean {
        const qty = this.stock.get(productId) ?? 0;
        if (qty <= 0) {
            console.log(`[Stock] Product "${productId}" is out of stock`);
            this.mediator.notify('Stock', 'outOfStock', productId);
            return false;
        }
        this.stock.set(productId, qty - 1);
        console.log(`[Stock] Reserved "${productId}" (${qty - 1} left)`);
        this.mediator.notify('Stock', 'reserved', productId);
        return true;
    }
}
