import { HouseBuilder } from '../core/house-builder.interface';
import { House } from '../products/house.product';

export class WoodHouseBuilder implements HouseBuilder {
    private house: House = new House();

    constructor() {
        this.reset();
    }

    reset(): void {
        this.house = new House();
    }

    buildWalls(): void {
        this.house.walls = 'Wooden';
    }

    buildRoof(): void {
        this.house.roof = 'Thatch';
    }

    buildGarden(): void {
        this.house.garden = true;
    }

    getHouse(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}
