import { Chair } from '../core/Chair.interface';
import { Sofa } from '../core/Sofa.interface';
import { CoffeeTable } from '../core/CoffeeTable.interface';

export class ModernChair implements Chair {
  hasLegs() { return true; }
  sitOn() { console.log('Sitting on a minimalist modern chair.'); }
}

export class ModernSofa implements Sofa {
  isComfortable() { return true; }
  lieOn() { console.log('Lying on a sleek modern sofa.'); }
}

export class ModernCoffeeTable implements CoffeeTable {
  placeCup() { console.log('Placing a cup on a glass modern coffee table.'); }
}
