import { ShippingStrategy } from '../core/shipping-strategy.interface';

export class StandardShipping implements ShippingStrategy {
    calculate(weightKg: number, distanceKm: number): number {
        return weightKg * 2 + distanceKm * 0.05;
    }
    getName(): string { return 'Standard (3-5 days)'; }
}
