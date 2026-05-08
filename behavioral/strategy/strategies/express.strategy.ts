import { ShippingStrategy } from '../core/shipping-strategy.interface';

export class ExpressShipping implements ShippingStrategy {
    calculate(weightKg: number, distanceKm: number): number {
        return weightKg * 5 + distanceKm * 0.15 + 20;
    }
    getName(): string { return 'Express (next day)'; }
}
