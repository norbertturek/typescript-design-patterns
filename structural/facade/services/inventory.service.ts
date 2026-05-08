export interface IInventoryService {
    checkStock(productId: string): boolean;
    reserveProduct(productId: string): void;
}

export class InventoryService implements IInventoryService {
    checkStock(productId: string): boolean {
        console.log(`[INVENTORY] Checking stock for product ${productId}...`);
        return true;
    }

    reserveProduct(productId: string): void {
        console.log(`[INVENTORY] Reserving product ${productId}`);
    }
}
