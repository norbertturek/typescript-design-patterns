import { FurnitureFactory } from '../core/FurnitureFactory.interface';
import { ModernChair, ModernSofa, ModernCoffeeTable } from './ModernProducts';

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible.
 */
export class ModernFurnitureFactory implements FurnitureFactory {
  createChair() { return new ModernChair(); }
  createSofa() { return new ModernSofa(); }
  createCoffeeTable() { return new ModernCoffeeTable(); }
}
