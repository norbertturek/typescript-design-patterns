/**
 * Another product interface. All products can interact with each other,
 * but proper interaction is possible only between products of the same variant.
 */
export interface Sofa {
  isComfortable(): boolean;
  lieOn(): void;
}
