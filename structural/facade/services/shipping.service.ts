export interface IShippingService {
    createShipment(productId: string, address: string): string;
}

export class ShippingService implements IShippingService {
    createShipment(productId: string, address: string): string {
        const trackingId = `TRACK-${Date.now()}`;
        console.log(`[SHIPPING] Creating shipment for ${productId} to "${address}". Tracking: ${trackingId}`);
        return trackingId;
    }
}
