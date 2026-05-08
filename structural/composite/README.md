# Composite

## What is it?

A pattern that lets you **treat groups of objects the same way as individual objects**. It creates a tree structure — leaves (`Product`) and containers (`Box`) implement the same interface. `Box.getPrice()` recursively sums the prices of all children.

## What problem does it solve?

When you have a part-whole hierarchy — a box contains products or other boxes. Without Composite: you must check `instanceof` and handle leaves and containers separately. With Composite: one interface works on both — the client doesn't know what it's talking to.

## When to use?

- **You need to implement a tree-like object structure** — a cart with boxes containing products or other boxes
- **You want the client to treat simple and complex elements uniformly** — `getPrice()` works on both `Product` and `Box`
- File system (Folder/File), UI components (Panel/Button), permissions (RoleGroup/Role)

## Key mechanism

```ts
// Shared interface for leaf and container
interface OrderComponent {
    getPrice(): number;
    getName(): string;
    print(indent?: string): void;
}

// Leaf — no children, returns its own price
class Product implements OrderComponent {
    constructor(private name: string, private price: number) {}
    getPrice(): number { return this.price; }
    getName(): string { return this.name; }
    print(indent = ''): void { console.log(`${indent}  ${this.name}: $${this.price}`); }
}

// Composite — container, recursion
class Box implements OrderComponent {
    private children: OrderComponent[] = [];

    add(component: OrderComponent): void { this.children.push(component); }
    remove(component: OrderComponent): void {
        this.children = this.children.filter(c => c !== component);
    }
    getName(): string { return this.name; }

    // The magic — same method as Leaf, but recursive
    getPrice(): number {
        return this.children.reduce((sum, child) => sum + child.getPrice(), 0);
    }

    print(indent = ''): void {
        console.log(`${indent}[Box] ${this.name}: $${this.getPrice()}`);
        this.children.forEach(child => child.print(indent + '  '));
    }

    constructor(private name: string) {}
}
```

## Example tree

```
Order ($1,398)
  Electronics ($1,298)
    iPhone 15 ($999)
    Accessories ($299)
      AirPods ($199)
      Cable ($100)
  Book ($100)
```

`order.getPrice()` → 1398, without checking what's a leaf and what's a box.

## How to implement?

1. Make sure the model can be represented as a tree — simple elements and containers
2. Declare the component interface with methods that make sense for both types
3. Create the Leaf class for simple elements
4. Create the Container class with an array of sub-elements (type: component interface) and `add`/`remove` methods
5. When implementing container methods — delegate to sub-elements (recursion)

## Pros and cons

**Pros:**
- Convenient work with complex trees — polymorphism and recursion work naturally
- Open/Closed — new element types without changes to existing code

**Cons:**
- Hard to provide a common interface when class functionality differs too much — may lead to overgeneralization

## Relations with other patterns

- Use **Builder** to construct complex Composite trees — steps can work recursively
- **Chain of Responsibility** often used with **Composite** — leaf passes request up through the chain of parents
- Use **Iterator** to traverse Composite trees
- Use **Visitor** to execute operations on an entire Composite tree
- **Composite** and **Decorator** have similar structures — both use recursive composition; Decorator has one child and adds behavior, Composite sums children

## File structure

```
composite/
├── core/
│   └── component.interface.ts      # OrderComponent (getPrice, getName, print)
├── components/
│   ├── product.leaf.ts             # Leaf — own price, no children
│   └── box.composite.ts            # Composite — add/remove + recursive getPrice
└── index.ts
```

**Run:** `npm run composite`
