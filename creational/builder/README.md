# Builder

## What is it?

A pattern that lets you **construct complex objects step by step**. Instead of a constructor with 10 parameters — you call successive builder methods. The same Director can build different representations (wooden house, stone house, instruction manual) using different Builders.

## What problem does it solve?

The "telescoping constructor" — a constructor with a growing number of optional parameters:
```ts
new House(true, false, true, false, 'brick', 3, true); // what is this?
```
Builder replaces this with a readable API. It also separates construction logic (Director) from representation (concrete Builder/Product).

## When to use?

- **You want to get rid of a "telescoping constructor"** — build only the steps you actually need
- **Multiple representations of the same construction process** — `WoodHouseBuilder` vs `StoneHouseBuilder` use the same steps but give different results
- **Building complex structures (trees, documents, SQL queries)** — Builder doesn't expose the unfinished product during construction

## Key mechanism

```ts
// Builder interface — declares construction steps
interface HouseBuilder {
    reset(): void;
    buildWalls(): void;
    buildRoof(): void;
    buildGarden(): void;
    getHouse(): House;
}

// Concrete Builder — implements steps for its representation
class StoneHouseBuilder implements HouseBuilder {
    private house = new House();
    reset(): void { this.house = new House(); }
    buildWalls(): void { this.house.addPart('Stone walls'); }
    buildRoof(): void { this.house.addPart('Slate roof'); }
    buildGarden(): void { this.house.addPart('Garden'); }
    getHouse(): House { return this.house; }
}

// Director — knows in which order to call steps
class HouseDirector {
    constructSimpleHouse(builder: HouseBuilder): void {
        builder.reset();
        builder.buildWalls();
        builder.buildRoof();
        // no buildGarden — simple steps only
    }

    constructFullHouse(builder: PoolHouseBuilder): void {
        builder.reset();
        builder.buildWalls();
        builder.buildRoof();
        builder.buildGarden();
        builder.buildPool();
    }
}

// Change builder → different representation, same Director
const director = new HouseDirector();
const builder = new StoneHouseBuilder();
director.constructSimpleHouse(builder);
const house = builder.getHouse(); // Stone walls + Slate roof
```

## How to implement?

1. Define the common construction steps for all product representations
2. Declare the Builder interface with those steps
3. Create concrete Builder classes for each representation and implement the steps
4. Implement a `getProduct()` method — its return type may not be in the interface if products don't share a common interface
5. Consider creating a Director class — encapsulates common construction routines
6. Client creates Builder and Director, passes Builder to Director, retrieves result from Builder

## Pros and cons

**Pros:**
- Step-by-step construction — you can defer or recursively invoke steps
- Same construction code for different product representations
- Single Responsibility — isolates complex construction code from product business logic

**Cons:**
- Increased code complexity — many new classes
- May be overkill for simple objects

## Relations with other patterns

- **Abstract Factory** returns the product immediately; **Builder** lets you do extra steps before retrieving the product
- Use **Builder** to construct complex **Composite** trees — steps can work recursively
- **Abstract Factory**, **Builder**, and **Prototype** can be implemented as **Singleton**
- Combine **Builder** with **Bridge**: Director plays the abstraction role, different Builders = implementations

## File structure

```
builder/
├── house/
│   ├── core/
│   │   ├── house-builder.interface.ts  # HouseBuilder + PoolHouseBuilder (extends HouseBuilder + buildPool)
│   │   └── house.director.ts           # constructSimpleHouse + constructFullHouse
│   ├── builders/
│   │   ├── wood-house.builder.ts       # wooden parts
│   │   └── stone-house.builder.ts      # stone parts
│   └── products/
│       └── house.product.ts
├── vehicle/                            # similarly: CarBuilder + ManualBuilder
│   ├── core/ builders/ products/
└── index.ts
```

**Run:** `npm run builder`

> Same Director, two different Builders: `CarBuilder` builds a `Car`, `ManualBuilder` builds a `Manual` (instruction booklet).
