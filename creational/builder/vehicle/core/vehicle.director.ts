import { VehicleBuilder } from './vehicle-builder.interface';

export class VehicleDirector {
    public constructSportsCar(builder: VehicleBuilder): void {
        builder.reset();
        builder.setSeats(2);
        builder.setEngine("Sport Engine");
        builder.setTripComputer();
        builder.setGPS();
    }

    public constructSUV(builder: VehicleBuilder): void {
        builder.reset();
        builder.setSeats(4);
        builder.setEngine("SUV Engine");
        builder.setGPS();
    }
}
