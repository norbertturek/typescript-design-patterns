import { PoolHouseBuilder } from '../core/house-builder.interface';
import { House } from '../products/house.product';

export class StoneHouseBuilder implements PoolHouseBuilder {
    private house: House = new House();

    constructor() {
        this.reset();
    }

    reset(): void {
        this.house = new House();
    }

    buildWalls(): void {
        this.house.walls = 'Stone';
    }

    buildRoof(): void {
        this.house.roof = 'Tile';
    }

    buildGarden(): void {
        this.house.garden = true;
    }

    buildPool(): void {
        this.house.pool = true;
    }

    getHouse(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}
