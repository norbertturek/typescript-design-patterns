import { ShippingStrategy } from './core/shipping-strategy.interface';

export class Order {
    constructor(
        public readonly id: string,
        public readonly weightKg: number,
        public readonly distanceKm: number,
        private strategy: ShippingStrategy,
    ) {}

    setStrategy(strategy: ShippingStrategy): void {
        this.strategy = strategy;
    }

    getShippingCost(): number {
        return this.strategy.calculate(this.weightKg, this.distanceKm);
    }

    printSummary(): void {
        const cost = this.getShippingCost();
        console.log(
            `Order ${this.id} | ${this.weightKg}kg | ${this.distanceKm}km` +
            ` | ${this.strategy.getName()} → $${cost.toFixed(2)}`
        );
    }
}
