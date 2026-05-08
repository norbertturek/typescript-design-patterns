import { Chair } from './Chair.interface';
import { Sofa } from './Sofa.interface';
import { CoffeeTable } from './CoffeeTable.interface';

/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept.
 */
export interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createCoffeeTable(): CoffeeTable;
}
