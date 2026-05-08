import { House } from '../products/house.product';

export interface HouseBuilder {
    reset(): void;
    buildWalls(): void;
    buildRoof(): void;
    buildGarden(): void;
    getHouse(): House;
}

export interface PoolHouseBuilder extends HouseBuilder {
    buildPool(): void;
}
