/**
 * Design Pattern: Abstract Factory
 * 
 * Intent:
 * Abstract Factory is a creational design pattern that lets you produce families 
 * of related objects without specifying their concrete classes.
 */

import { FurnitureFactory } from './core/FurnitureFactory.interface';
import { ModernFurnitureFactory } from './modern/ModernFurnitureFactory';
import { VictorianFurnitureFactory } from './victorian/VictorianFurnitureFactory';
import { ArtDecoFurnitureFactory } from './art-deco/ArtDecoFurnitureFactory';

/**
 * The client code works with factories and products only through abstract
 * types: FurnitureFactory, Chair, Sofa, etc. This lets you pass any factory
 * or product subclass to the client code without breaking it.
 */
function createRoom(factory: FurnitureFactory) {
  const chair = factory.createChair();
  const sofa = factory.createSofa();
  const table = factory.createCoffeeTable();

  console.log('--- Creating a new room set ---');
  chair.sitOn();
  sofa.lieOn();
  table.placeCup();
}

/**
 * The application picks the factory type depending on the configuration or
 * environment.
 */
console.log('Client: Testing client code with Modern factory...');
createRoom(new ModernFurnitureFactory());

console.log('\nClient: Testing client code with Victorian factory...');
createRoom(new VictorianFurnitureFactory());

console.log('\nClient: Testing client code with Art Deco factory...');
createRoom(new ArtDecoFurnitureFactory());
