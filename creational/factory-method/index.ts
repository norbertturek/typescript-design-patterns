import { LogisticsBase } from './core/logistics.base';
import { RoadLogisticsFactory } from './road-transport/road-logistics.factory';
import { SeaLogisticsFactory } from './sea-transport/sea-logistics.factory';
import { AirLogisticsFactory } from './air-transport/air-logistics.factory';

function clientCode(creator: LogisticsBase) {
  creator.planDelivery();
}

console.log("--- Example 1: Road Transport ---");
clientCode(new RoadLogisticsFactory());

console.log("\n--- Example 2: Sea Transport ---");
clientCode(new SeaLogisticsFactory());

console.log("\n--- Example 3: Air Transport ---");
clientCode(new AirLogisticsFactory());
