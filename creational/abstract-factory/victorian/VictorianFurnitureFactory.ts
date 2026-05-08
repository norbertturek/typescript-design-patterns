import { FurnitureFactory } from '../core/FurnitureFactory.interface';
import { VictorianChair, VictorianSofa, VictorianCoffeeTable } from './VictorianProducts';

export class VictorianFurnitureFactory implements FurnitureFactory {
  createChair() { return new VictorianChair(); }
  createSofa() { return new VictorianSofa(); }
  createCoffeeTable() { return new VictorianCoffeeTable(); }
}
