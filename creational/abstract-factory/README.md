# Abstract Factory

## What is it?

A pattern that provides an **interface for creating families of related objects** without specifying their concrete classes. One factory creates Chair + Sofa + CoffeeTable and guarantees they all belong to the same style (Modern, Victorian, ArtDeco).

## What problem does it solve?

When you have several categories of products that must match each other. Without Abstract Factory: nothing stops you from creating a `ModernChair` with a `VictorianSofa`. With Abstract Factory: you pick one factory and everything coming out of it is consistent.

## When to use?

- **Your code needs to work with different families of related products**, but you don't want to depend on their concrete classes — e.g. different furniture styles, different platforms (Windows/Mac), different UI themes
- **You have a class with a set of Factory Methods that obscure its main responsibility** — extract them into a separate factory
- You want to guarantee that the products you get are compatible with each other

## Key mechanism

```ts
// Factory interface — defines what can be created
interface FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
}

// Concrete factories — each creates a consistent family
class ModernFurnitureFactory implements FurnitureFactory {
    createChair(): Chair { return new ModernChair(); }
    createSofa(): Sofa { return new ModernSofa(); }
    createCoffeeTable(): CoffeeTable { return new ModernCoffeeTable(); }
}

class VictorianFurnitureFactory implements FurnitureFactory {
    createChair(): Chair { return new VictorianChair(); }
    createSofa(): Sofa { return new VictorianSofa(); }
    createCoffeeTable(): CoffeeTable { return new VictorianCoffeeTable(); }
}

// Client — knows only the FurnitureFactory interface, not concrete classes
function furnishRoom(factory: FurnitureFactory) {
    const chair = factory.createChair();
    const sofa = factory.createSofa();
    // chair and sofa are guaranteed to match
}

furnishRoom(new ModernFurnitureFactory());    // all Modern
furnishRoom(new VictorianFurnitureFactory()); // all Victorian
```

## How to implement?

1. Build a matrix: product types (Chair, Sofa, Table) × variants (Modern, Victorian, ArtDeco)
2. Declare interfaces for each product type
3. Declare the factory interface with creation methods for each product
4. Create concrete factory classes — one per variant
5. Create factory initialization code — choose the concrete factory based on configuration
6. Replace all direct `new ConcreteProduct()` with calls to the appropriate factory method

## Pros and cons

**Pros:**
- Guaranteed product consistency — you always get compatible components
- No tight coupling between client and concrete products
- Single Responsibility — product creation in one place
- Open/Closed — new variant = new factory class, zero changes to the client

**Cons:**
- Many new interfaces and classes — code becomes more complex
- Hard to extend with a new product TYPE (changing the factory interface = changing all factories)

## Relations with other patterns

- **Factory Method** vs **Abstract Factory**: Factory Method creates one product via inheritance; Abstract Factory creates families via composition
- **Builder** constructs complex objects step by step; Abstract Factory returns the product immediately
- **Abstract Factory** can replace **Facade** when you only want to hide how objects are created
- **Abstract Factory**, **Builder**, and **Prototype** can be implemented as **Singleton**

## File structure

```
abstract-factory/
├── core/
│   ├── FurnitureFactory.interface.ts   # FurnitureFactory (createChair, createSofa, createCoffeeTable)
│   ├── Chair.interface.ts
│   ├── Sofa.interface.ts
│   └── CoffeeTable.interface.ts
├── modern/
│   ├── ModernFurnitureFactory.ts
│   └── ModernProducts.ts               # ModernChair, ModernSofa, ModernCoffeeTable
├── victorian/
│   ├── VictorianFurnitureFactory.ts
│   └── VictorianProducts.ts
├── art-deco/
│   ├── ArtDecoFurnitureFactory.ts
│   └── ArtDecoProducts.ts
└── index.ts
```

**Run:** `npm run abstract-factory`

## Factory Method vs Abstract Factory

| | Factory Method | Abstract Factory |
|---|---|---|
| **Creates** | One product type | A family of related products |
| **Mechanism** | Inheritance | Composition |
| **Consistency guarantee** | None | Yes |
| **New variant** | New creator subclass | New factory class |
