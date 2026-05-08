import { Chair } from '../core/Chair.interface';
import { Sofa } from '../core/Sofa.interface';
import { CoffeeTable } from '../core/CoffeeTable.interface';

export class VictorianChair implements Chair {
  hasLegs() { return true; }
  sitOn() { console.log('Sitting on an ornate Victorian chair.'); }
}

export class VictorianSofa implements Sofa {
  isComfortable() { return true; }
  lieOn() { console.log('Lying on a velvet Victorian sofa.'); }
}

export class VictorianCoffeeTable implements CoffeeTable {
  placeCup() { console.log('Placing a cup on a heavy wooden Victorian coffee table.'); }
}
