# TypeScript Design Patterns

A practical reference for all 23 GoF design patterns implemented in TypeScript. Each pattern has a focused, runnable example built around an e-commerce / logistics domain — orders, shipping, notifications, products.

## Running examples

```bash
npm run <pattern-name>
# e.g.
npm run observer
npm run factory-method
npm run proxy
```

---

## Creational Patterns

| Pattern | What it does | Run |
|---------|-------------|-----|
| [Factory Method](./creational/factory-method/README.md) | Base class defines object creation; subclasses decide the concrete type | `npm run factory-method` |
| [Abstract Factory](./creational/abstract-factory/README.md) | Creates families of related objects, guaranteeing they match | `npm run abstract-factory` |
| [Builder](./creational/builder/README.md) | Constructs complex objects step by step; Director controls the sequence | `npm run builder` |
| [Prototype](./creational/prototype/README.md) | Clones existing objects without depending on their concrete classes | `npm run prototype` |
| [Singleton](./creational/singleton/README.md) | Guarantees exactly one instance; global access point (⚠️ anti-pattern — prefer DI) | — |

---

## Structural Patterns

| Pattern | What it does | Run |
|---------|-------------|-----|
| [Adapter](./structural/adapter/README.md) | Translates one interface into another expected by the client | `npm run adapter` |
| [Composite](./structural/composite/README.md) | Treats individual objects and groups uniformly via a tree structure | `npm run composite` |
| [Decorator](./structural/decorator/README.md) | Wraps objects in stackable behavior layers at runtime | `npm run decorator` |
| [Facade](./structural/facade/README.md) | Provides a simplified interface to a complex subsystem | `npm run facade` |
| [Proxy](./structural/proxy/README.md) | Substitutes a stand-in with access control, caching, or logging | `npm run proxy` |

> Bridge and Flyweight are GoF structural patterns rarely needed in TypeScript — no implementations included.

---

## Behavioral Patterns

| Pattern | What it does | Run |
|---------|-------------|-----|
| [Chain of Responsibility](./behavioral/chain-of-responsibility/README.md) | Passes a request through a chain of handlers until one processes it | `npm run chain-of-responsibility` |
| [Command](./behavioral/command/README.md) | Encapsulates an action as an object — enables undo/redo and queuing | `npm run command` |
| [Iterator](./behavioral/iterator/README.md) | Provides sequential access to a collection without exposing its structure | `npm run iterator` |
| [Mediator](./behavioral/mediator/README.md) | Centralizes component communication — components talk only to the mediator | `npm run mediator` |
| [Memento](./behavioral/memento/README.md) | Saves and restores object state without breaking encapsulation | `npm run memento` |
| [Observer](./behavioral/observer/README.md) | Pub/Sub — publisher notifies subscribers of events dynamically | `npm run observer` |
| [State](./behavioral/state/README.md) | Object changes behavior when its internal state changes | `npm run state` |
| [Strategy](./behavioral/strategy/README.md) | Swaps algorithms at runtime — each is a separate class | `npm run strategy` |
| [Template Method](./behavioral/template-method/README.md) | Defines algorithm skeleton in base class; subclasses fill in steps | `npm run template-method` |

---

## Quick comparisons

### Patterns that look similar

| Pair | Key difference |
|------|----------------|
| **State vs Strategy** | State changes itself; Strategy is swapped by the client |
| **Command vs Strategy** | Command converts action to an object (undo, queue); Strategy swaps algorithms |
| **Decorator vs Proxy** | Decorator adds behavior (client controls stacking); Proxy controls access (transparent) |
| **Facade vs Mediator** | Facade: client → subsystem (one-way); Mediator: bidirectional, components know it |
| **Facade vs Adapter** | Facade simplifies; Adapter converts an incompatible interface |
| **Factory Method vs Abstract Factory** | FM creates one product (inheritance); AF creates a family (composition) |
| **Template Method vs Strategy** | TM: inheritance, fixed at compile time; Strategy: composition, swappable at runtime |

### Undo/redo approaches

| | Command | Memento |
|---|---|---|
| **How** | Command knows how to reverse itself | Restore a saved state snapshot |
| **Better when** | Simple operations with clear inverses | Complex state, many fields at once |

---

## Project structure

```
typescript-design-patterns/
├── creational/
│   ├── factory-method/
│   ├── abstract-factory/
│   ├── builder/
│   ├── prototype/
│   └── singleton/
├── structural/
│   ├── adapter/
│   ├── composite/
│   ├── decorator/
│   ├── facade/
│   └── proxy/
└── behavioral/
    ├── chain-of-responsibility/
    ├── command/
    ├── iterator/
    ├── mediator/
    ├── memento/
    ├── observer/
    ├── state/
    ├── strategy/
    └── template-method/
```
