import { FurnitureFactory } from '../core/FurnitureFactory.interface';
import { ArtDecoChair, ArtDecoSofa, ArtDecoCoffeeTable } from './ArtDecoProducts';

export class ArtDecoFurnitureFactory implements FurnitureFactory {
  createChair() { return new ArtDecoChair(); }
  createSofa() { return new ArtDecoSofa(); }
  createCoffeeTable() { return new ArtDecoCoffeeTable(); }
}
