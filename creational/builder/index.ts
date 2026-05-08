import { VehicleDirector } from './vehicle/core/vehicle.director';
import { CarBuilder } from './vehicle/builders/car.builder';
import { CarManualBuilder } from './vehicle/builders/manual.builder';

import { HouseDirector } from './house/core/house.director';
import { StoneHouseBuilder } from './house/builders/stone-house.builder';
import { WoodHouseBuilder } from './house/builders/wood-house.builder';

function clientCode() {
    console.log("--- VEHICLE DOMAIN EXAMPLE ---");
    const vehicleDirector = new VehicleDirector();
    
    console.log("Building a Sports Car:");
    const carBuilder = new CarBuilder();
    vehicleDirector.constructSportsCar(carBuilder);
    const car = carBuilder.getProduct();
    car.listParts();

    console.log("\nBuilding an SUV:");
    const suvBuilder = new CarBuilder();
    vehicleDirector.constructSUV(suvBuilder);
    const suv = suvBuilder.getProduct();
    suv.listParts();

    console.log("\nBuilding a Sports Car Manual:");
    const manualBuilder = new CarManualBuilder();
    vehicleDirector.constructSportsCar(manualBuilder);
    const manual = manualBuilder.getProduct();
    manual.listParts();

    console.log("Building an SUV Manual:");
    const suvManualBuilder = new CarManualBuilder();
    vehicleDirector.constructSUV(suvManualBuilder);
    const suvManual = suvManualBuilder.getProduct();
    suvManual.listParts();

    console.log("\n--- HOUSE DOMAIN EXAMPLE ---");
    const houseDirector = new HouseDirector();

    console.log("Constructing a full Stone House via Director:");
    const stoneBuilder = new StoneHouseBuilder();
    houseDirector.constructFullHouse(stoneBuilder);
    const stoneHouse = stoneBuilder.getHouse();
    stoneHouse.describe();

    console.log("Constructing a simple Wooden House via Director:");
    const woodBuilder = new WoodHouseBuilder();
    houseDirector.constructSimpleHouse(woodBuilder);
    const woodHouse = woodBuilder.getHouse();
    woodHouse.describe();
}

clientCode();
