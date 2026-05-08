import { LogisticsBase } from '../core/logistics.base';
import { Transport } from '../core/transport.interface';
import { Airplane } from './airplane.product';

export class AirLogisticsFactory extends LogisticsBase {
  public createTransport(): Transport {
    return new Airplane();
  }
}
