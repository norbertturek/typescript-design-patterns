import { VehicleBuilder } from '../core/vehicle-builder.interface';
import { Car } from '../products/car.product';

export class CarBuilder implements VehicleBuilder {
    private car: Car = new Car();

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.car = new Car();
    }

    public setSeats(seats: number): void {
        this.car.seats = seats;
    }

    public setEngine(engine: string): void {
        this.car.engine = engine;
    }

    public setTripComputer(): void {
        this.car.tripComputer = true;
    }

    public setGPS(): void {
        this.car.gps = true;
    }

    public getProduct(): Car {
        const result = this.car;
        this.reset();
        return result;
    }
}
