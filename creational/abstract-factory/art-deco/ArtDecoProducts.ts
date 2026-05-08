import { Chair } from '../core/Chair.interface';
import { Sofa } from '../core/Sofa.interface';
import { CoffeeTable } from '../core/CoffeeTable.interface';

export class ArtDecoChair implements Chair {
  hasLegs() { return true; }
  sitOn() { console.log('Sitting on a geometric Art Deco chair.'); }
}

export class ArtDecoSofa implements Sofa {
  isComfortable() { return true; }
  lieOn() { console.log('Lying on a glamorous Art Deco sofa.'); }
}

export class ArtDecoCoffeeTable implements CoffeeTable {
  placeCup() { console.log('Placing a cup on a stylized Art Deco coffee table.'); }
}
