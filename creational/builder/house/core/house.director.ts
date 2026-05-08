import { HouseBuilder, PoolHouseBuilder } from './house-builder.interface';

export class HouseDirector {
    public constructFullHouse(builder: PoolHouseBuilder): void {
        builder.reset();
        builder.buildWalls();
        builder.buildRoof();
        builder.buildGarden();
        builder.buildPool();
    }

    public constructSimpleHouse(builder: HouseBuilder): void {
        builder.reset();
        builder.buildWalls();
        builder.buildRoof();
    }
}
