import { LogisticsBase } from '../core/logistics.base';
import { Transport } from '../core/transport.interface';
import { Truck } from './truck.product';

export class RoadLogisticsFactory extends LogisticsBase {
  public createTransport(): Transport {
    return new Truck();
  }
}
