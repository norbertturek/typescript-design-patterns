export interface ShippingStrategy {
    calculate(weightKg: number, distanceKm: number): number;
    getName(): string;
}
