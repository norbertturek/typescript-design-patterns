import { Transport } from '../core/transport.interface';

export class Ship implements Transport {
  public deliver(): void {
    console.log("🚢 Delivering cargo by sea in a huge container.");
  }
}
