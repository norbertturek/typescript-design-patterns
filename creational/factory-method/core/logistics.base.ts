import { Transport } from './transport.interface';

export abstract class LogisticsBase {
  public abstract createTransport(): Transport;

  public planDelivery(): void {
    const transport = this.createTransport();
    console.log("📦 Logistics: Preparing shipment and documents...");
    transport.deliver();
  }
}
