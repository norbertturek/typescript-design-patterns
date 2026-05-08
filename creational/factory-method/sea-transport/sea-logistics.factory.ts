import { LogisticsBase } from '../core/logistics.base';
import { Transport } from '../core/transport.interface';
import { Ship } from './ship.product';

export class SeaLogisticsFactory extends LogisticsBase {
  public createTransport(): Transport {
    return new Ship();
  }
}
