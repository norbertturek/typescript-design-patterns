# Prototype

## What is it?

A pattern that lets you **copy existing objects without making your code dependent on their concrete classes**. Each object implements `clone()` and knows how to copy itself — including private fields.

## What problem does it solve?

When you need to copy an object but you're working through an interface and don't know the concrete class. A regular `new Circle(x, y, r, color)` requires knowing all fields — including private ones. `clone()` lets the object copy itself.

Second case: you have many class configurations as subclasses (SmallRedCircle, LargeBlueRect...) — instead of multiplying subclasses, keep pre-configured prototypes and clone them.

## When to use?

- **Code shouldn't depend on concrete classes of objects to copy** — e.g. you received an object through an interface from an external library
- **You want to reduce the number of subclasses** that differ only in initialization — use a registry with pre-configured prototypes
- Object creation is expensive (configuration, DB queries) — clone a ready object instead of building from scratch

## Key mechanism

```ts
// Prototype interface
interface Prototype<T> {
    clone(): T;
}

// Object knows how to copy itself
class Circle implements Prototype<Circle> {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
    ) {}

    clone(): Circle {
        return new Circle(this.x, this.y, this.radius, this.color);
    }
}

// Client — doesn't know Circle, but can copy it
const original = new Circle(10, 20, 5, 'red');
const copy = original.clone();
copy.color = 'blue'; // modify the copy, original unchanged
```

## Registry — central prototype repository

```ts
class ShapeRegistry {
    private prototypes = new Map<string, Prototype<unknown>>();

    register(key: string, proto: Prototype<unknown>): void {
        this.prototypes.set(key, proto);
    }

    clone<T>(key: string): T {
        const proto = this.prototypes.get(key);
        if (!proto) throw new Error(`Prototype "${key}" not found`);
        return proto.clone() as T;
    }
}

// Register once — clone many times
registry.register('small-red-circle', new Circle(0, 0, 5, 'red'));
const c1 = registry.clone<Circle>('small-red-circle');
const c2 = registry.clone<Circle>('small-red-circle');
```

## How to implement?

1. Create the Prototype interface with a `clone()` method
2. The prototype class must have a constructor or copy method that copies all fields (including private) from the passed object
3. `clone()` is usually one line: `return new ClassName(this.field1, this.field2, ...)`
4. Each subclass must explicitly override `clone()` using its own class name
5. Optionally create a central registry storing a catalog of pre-configured prototypes

## Pros and cons

**Pros:**
- Cloning without dependency on concrete classes
- Elimination of repetitive initialization code
- Alternative to inheritance when configuring objects

**Cons:**
- Cloning complex objects with circular references can be difficult
- Deep copy requires recursive cloning of nested objects

## Relations with other patterns

- **Prototype** can help when saving copies of **Commands** to history
- Projects that heavily use **Composite** and **Decorator** often benefit from **Prototype** — clone complex structures instead of building from scratch
- Sometimes **Prototype** can replace **Memento** if the object's state is simple and has no links to external resources
- **Abstract Factory**, **Builder**, and **Prototype** can be implemented as **Singleton**

## File structure

```
prototype/
├── core/
│   └── prototype.interface.ts      # Prototype<T> (clone(): T)
├── shapes/
│   ├── circle.shape.ts             # Circle — clone() → new Circle(...)
│   └── rectangle.shape.ts
├── registry/
│   └── shape.registry.ts           # ShapeRegistry — register + clone<T>
└── index.ts
```

**Run:** `npm run prototype`

## Shallow vs deep copy

| | Shallow | Deep |
|---|---|---|
| **Copies** | Primitives + references | Everything recursively |
| **When OK** | Only primitive fields | Nested objects |
| **Problem** | Shared mutable state | Circular references |
