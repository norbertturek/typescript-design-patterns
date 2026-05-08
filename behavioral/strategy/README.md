# Strategy

## What is it?

A pattern that allows **swapping an algorithm at runtime**. Each algorithm is a separate class implementing the same interface. The Context holds a reference to the strategy and delegates calculations to it. The pattern suggests extracting all algorithm variants into separate classes called strategies.

## What problem does it solve?

When the same problem can be solved in multiple ways and you want to be able to choose or change the approach without modifying the class using the algorithm. A new strategy = a new class, zero changes to Context.

## When to use?

- **You want to use different algorithm variants and switch between them at runtime** — shipping cost calculator: standard/express/pickup
- **Many similar classes differ only in how they execute a certain behavior** — Strategy lets you extract the varying behavior into a class hierarchy and merge the original classes into one
- **You want to isolate business logic from implementation details of the algorithm** — client gets a simple interface, knows nothing about the details
- **A class has a large conditional switching between algorithm variants** — replace with Strategy

## Key mechanism

```ts
// Interface — all strategies must implement it
interface ShippingStrategy {
    calculate(weightKg: number, distanceKm: number): number;
    getName(): string;
}

// Concrete strategies — separate classes, no knowledge of each other
class StandardShipping implements ShippingStrategy {
    calculate(w: number, d: number): number { return w * 2 + d * 0.05; }
    getName(): string { return 'Standard Shipping'; }
}

class ExpressShipping implements ShippingStrategy {
    calculate(w: number, d: number): number { return w * 5 + d * 0.15 + 20; }
    getName(): string { return 'Express Shipping'; }
}

class StorePickup implements ShippingStrategy {
    calculate(): number { return 0; }
    getName(): string { return 'Store Pickup'; }
}

// Context — holds strategy, can be swapped at runtime
class Order {
    constructor(
        private weightKg: number,
        private distanceKm: number,
        private strategy: ShippingStrategy
    ) {}

    setStrategy(strategy: ShippingStrategy): void {
        this.strategy = strategy;
    }

    getShippingCost(): number {
        return this.strategy.calculate(this.weightKg, this.distanceKm);
    }
}

// Swapping at runtime
order.setStrategy(new ExpressShipping());
order.getShippingCost(); // calculates with express
order.setStrategy(new StorePickup());
order.getShippingCost(); // returns 0
```

## How to implement?

1. In the Context class, identify an algorithm that's prone to frequent changes or a large conditional
2. Declare the Strategy interface common to all variants
3. Extract algorithms into separate classes implementing the Strategy interface
4. Add a field in Context for the Strategy reference; add a setter
5. Context uses Strategy only through the interface
6. Clients associate the appropriate Strategy with Context

## Pros and cons

**Pros:**
- Swap algorithms at runtime
- Isolate implementation details from the using code
- Replace inheritance with composition
- Open/Closed — new strategies without changes to Context

**Cons:**
- Overkill if there are only a few algorithms that rarely change
- Clients must know the differences between strategies to pick the right one
- Modern languages with functional types allow implementing strategies as anonymous functions without extra classes

## Relations with other patterns

- **Bridge**, **State**, **Strategy** have similar structures — all rely on composition; they differ in the problems they solve
- **Command** and **Strategy** look similar — both parameterize an object with an action; **Command** converts an operation into an object (queue, log, serialize); **Strategy** describes different ways of doing the same thing
- **Decorator** changes the "skin" of an object; **Strategy** changes its "guts"
- **Template Method** relies on inheritance — changes parts of an algorithm by overriding them in subclasses; **Strategy** relies on composition — you swap objects implementing different behaviors

## File structure

```
strategy/
├── core/
│   └── shipping-strategy.interface.ts  # ShippingStrategy (calculate + getName)
├── strategies/
│   ├── standard.strategy.ts            # weight*2 + distance*0.05
│   ├── express.strategy.ts             # weight*5 + distance*0.15 + 20
│   └── store-pickup.strategy.ts        # always 0
├── order.context.ts                    # Order — setStrategy() + getShippingCost()
└── index.ts                            # same order, 3 different shipping costs
```

**Run:** `npm run strategy`

## Strategy vs Template Method

| | Strategy | Template Method |
|---|---|---|
| **Mechanism** | Composition | Inheritance |
| **Swap at runtime?** | Yes — `setStrategy()` | No — fixed at compile time |
| **Shared logic** | Client composes it | In the base class |
