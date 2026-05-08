# Factory Method

## What is it?

A pattern that defines an **interface for creating objects in a base class**, but lets subclasses decide which concrete object to create. The base class contains business logic using the product — subclasses only override one factory method (`createTransport()`).

## What problem does it solve?

When a class must create objects but shouldn't be tied to their concrete classes. Without Factory Method: `new Truck()` hardcoded inside logistics — changing transport = changing the class. With Factory Method: logistics calls `createTransport()`, the subclass decides what to return.

## When to use?

- **You don't know upfront the types of objects you'll need** — business logic works with the `Transport` interface, the concrete type (Truck/Ship/Airplane) depends on the subclass
- **You want to give framework users the ability to extend it** — override one method instead of rebuilding the whole framework
- **Object creation should be in one place** — instead of scattered `new` calls throughout the code
- **Reusing existing instances** — the factory method can return an existing object from a pool instead of creating a new one

## Key mechanism

```ts
// Base class — contains business logic, calls factory method
abstract class LogisticsBase {
    abstract createTransport(): Transport; // Factory Method

    planDelivery(): void {
        const transport = this.createTransport(); // doesn't know what type
        console.log('Preparing shipment...');
        transport.deliver();
    }
}

// Subclasses — only override the factory method
class RoadLogisticsFactory extends LogisticsBase {
    createTransport(): Transport {
        return new Truck();
    }
}

class AirLogisticsFactory extends LogisticsBase {
    createTransport(): Transport {
        return new Airplane();
    }
}

// Client works with abstraction
const logistics: LogisticsBase = new RoadLogisticsFactory();
logistics.planDelivery(); // → Truck.deliver()
```

## How to implement?

1. Make sure all products implement the same interface (`Transport`)
2. Add an abstract factory method in the base class — return type = product interface
3. Replace all `new ConcreteProduct()` in the base class with factory method calls
4. For each product type create a subclass and override the factory method
5. If the base factory method body becomes empty — make it `abstract`

## Pros and cons

**Pros:**
- No tight coupling between creator and concrete products
- Single Responsibility — object creation in one place
- Open/Closed — new product = new subclass, zero changes to existing code

**Cons:**
- Many subclasses — each new product requires a new creator subclass
- May be overkill if the product hierarchy is simple

## Relations with other patterns

- Many projects start with **Factory Method** and evolve toward **Abstract Factory** or **Builder**
- **Abstract Factory** often consists of a set of Factory Methods
- **Factory Method** is a specialization of **Template Method** — factory method is one step in the template algorithm
- Use **Factory Method** together with **Iterator** so a collection returns different types of iterators

## File structure

```
factory-method/
├── core/
│   ├── transport.interface.ts          # Transport (deliver)
│   └── logistics.base.ts               # LogisticsBase — abstract createTransport() + planDelivery()
├── road-transport/
│   ├── road-logistics.factory.ts       # createTransport() → new Truck()
│   └── truck.product.ts
├── air-transport/
│   ├── air-logistics.factory.ts        # createTransport() → new Airplane()
│   └── airplane.product.ts
├── sea-transport/
│   ├── sea-logistics.factory.ts        # createTransport() → new Ship()
│   └── ship.product.ts
└── index.ts
```

**Run:** `npm run factory-method`
