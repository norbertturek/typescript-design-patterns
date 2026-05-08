import { Transport } from '../core/transport.interface';

export class Airplane implements Transport {
  public deliver(): void {
    console.log("✈️ Delivering cargo by air with express delivery.");
  }
}
