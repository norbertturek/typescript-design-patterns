import { ShippingStrategy } from '../core/shipping-strategy.interface';

export class StorePickup implements ShippingStrategy {
    calculate(_weightKg: number, _distanceKm: number): number {
        return 0;
    }
    getName(): string { return 'Store Pickup (free)'; }
}
