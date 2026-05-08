# Iterator

## What is it?

A pattern that **separates the way of iterating from the collection itself**. The collection provides one or more iterators — each with its own traversal logic. The client uses the `hasNext()` / `next()` interface and doesn't know the internal structure of the collection.

## What problem does it solve?

When a collection has a complex structure (tree, priority queue) and you want to traverse it in different ways without mixing iteration logic with collection logic. You can also have multiple independent iterators on the same collection simultaneously — each with its own cursor.

## When to use?

- **The collection has a complex internal structure, but you want to hide that complexity from the client** — client gets a simple interface, structure is encapsulated
- **You want to reduce traversal code duplication** — instead of scattered `for` loops with sorting logic — a separate iterator class
- **You want to traverse different data structures or types are unknown upfront** — the Iterator interface works on any collection implementing it
- Priority queue (ASC/DESC), tree (BFS/DFS), playlist (random/linear)

## Key mechanism

```ts
// Iterator interface
interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

// Collection creates iterators — doesn't implement them itself
class OrderQueue implements IterableCollection<Order> {
    private orders: Order[] = [];

    add(order: Order): void { this.orders.push(order); }

    createAscendingIterator(): Iterator<Order> {
        return new AscendingIterator(this.orders);
    }

    createDescendingIterator(): Iterator<Order> {
        return new DescendingIterator(this.orders);
    }
}

// Iterator holds its own cursor — independent from other iterators
class AscendingIterator implements Iterator<Order> {
    private sorted: Order[];
    private index = 0;

    constructor(orders: Order[]) {
        this.sorted = [...orders].sort((a, b) => a.priority - b.priority);
    }

    hasNext(): boolean { return this.index < this.sorted.length; }
    next(): Order { return this.sorted[this.index++]; }
}
```

## Independent iterators

```ts
const iter1 = queue.createAscendingIterator();
const iter2 = queue.createDescendingIterator();

// Each iterator has its own cursor — they don't interfere with each other
iter1.next(); // moves only iter1
iter2.next(); // moves only iter2
// collection unchanged
```

## How to implement?

1. Declare the Iterator interface with at minimum `hasNext()` and `next()`; optionally `previous()`, `position()`
2. Declare the collection interface with a factory method for creating iterators
3. Implement concrete iterator classes — each linked to a concrete collection instance (usually via constructor)
4. Implement the collection interface in collection classes — the iterator-creating method is a Factory Method
5. Replace all traversal code in the client with iterators

## Pros and cons

**Pros:**
- Single Responsibility — extract complex traversal algorithms into separate classes
- Open/Closed — new collections and iterators without changes to existing code
- Ability to iterate in parallel — each iterator has its own state
- Ability to pause and resume iteration

**Cons:**
- Overkill for simple collections
- Iterator may be less efficient than direct access to a specialized collection

## Relations with other patterns

- Use **Iterator** to traverse **Composite** trees
- **Factory Method** together with **Iterator** — collection returns different types of iterators compatible with the collection
- **Memento** + **Iterator** — save iteration state and rewind if needed
- **Visitor** + **Iterator** — traverse a complex structure and execute operations on each element

## File structure

```
iterator/
├── core/
│   ├── iterator.interface.ts           # Iterator<T> (hasNext + next)
│   ├── iterable-collection.interface.ts
│   └── order.ts                        # Order DTO (id, product, priority)
├── collection/
│   └── order-queue.ts                  # collection with two factory methods
├── iterators/
│   ├── ascending.iterator.ts           # sorts ascending by priority
│   └── descending.iterator.ts          # sorts descending by priority
└── index.ts
```

**Run:** `npm run iterator`
