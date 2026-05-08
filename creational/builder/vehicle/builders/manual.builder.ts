import { VehicleBuilder } from '../core/vehicle-builder.interface';
import { Manual } from '../products/manual.product';

export class CarManualBuilder implements VehicleBuilder {
    private manual: Manual = new Manual();

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.manual = new Manual();
    }

    public setSeats(seats: number): void {
        this.manual.content += `- This car has ${seats} seats.\n`;
    }

    public setEngine(engine: string): void {
        this.manual.content += `- Engine: ${engine}.\n`;
    }

    public setTripComputer(): void {
        this.manual.content += `- Trip computer: toggle the menu to see stats.\n`;
    }

    public setGPS(): void {
        this.manual.content += `- GPS: enter your destination in the search bar.\n`;
    }

    public getProduct(): Manual {
        const result = this.manual;
        this.reset();
        return result;
    }
}
