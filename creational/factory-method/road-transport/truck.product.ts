import { Transport } from '../core/transport.interface';

export class Truck implements Transport {
  public deliver(): void {
    console.log("🚚 Delivering cargo by land in a box.");
  }
}
