export interface VehicleBuilder {
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    setTripComputer(): void;
    setGPS(): void;
}
