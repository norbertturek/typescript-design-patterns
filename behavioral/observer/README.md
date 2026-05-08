# Observer

## What is it?

A **Pub/Sub** pattern — a Publisher (Subject) defines a subscription mechanism and notifies Observers about events. The Publisher knows nothing about specific Observers. Observers subscribe to events and react independently of one another.

## What problem does it solve?

When a state change in one object requires changes in others, and the set of those objects is unknown upfront or changes dynamically. The Publisher should not know how many subscribers it has or what they do.

## When to use?

- **A state change in one object may require changes in others, but the set of those objects is unknown upfront** — the number of subscribers changes dynamically
- **Some objects need to observe others only for a limited time or in specific cases** — the subscription list is dynamic, subscribers can join and leave
- Notification system (email + SMS + analytics react to the same events), UI event bus, stock market

## Key mechanism

```ts
// Publisher holds a map of event → Set<Observer>
class OrderStore implements Subject<OrderEvent> {
    private listeners = new Map<string, Set<Observer<OrderEvent>>>();

    subscribe(event: string, observer: Observer<OrderEvent>): void {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event)!.add(observer);
    }

    unsubscribe(event: string, observer: Observer<OrderEvent>): void {
        this.listeners.get(event)?.delete(observer);
    }

    notify(event: string, data: OrderEvent): void {
        this.listeners.get(event)?.forEach(obs => obs.update(event, data));
    }

    placeOrder(id: string, product: string, amount: number): void {
        // business logic...
        this.notify('order:placed', { id, product, amount });
    }
}

// Observer — reacts to an event
class EmailObserver implements Observer<OrderEvent> {
    update(event: string, data: OrderEvent): void {
        console.log(`[Email] Confirmation for order ${data.id}`);
    }
}
```

## Selective subscriptions

```ts
store.subscribe('order:placed', emailObserver);
store.subscribe('order:placed', smsObserver);
store.subscribe('order:shipped', emailObserver);
// smsObserver doesn't subscribe to 'order:shipped' — it doesn't receive that event

// Dynamic unsubscription
store.unsubscribe('order:cancelled', smsObserver);
```

## How to implement?

1. Split business logic into: Publisher (core functionality) + Subscribers
2. Declare a Subscriber interface with an `update(event, data)` method
3. Declare a Publisher interface with `subscribe()`, `unsubscribe()`, `notify()` methods
4. Decide where to store the subscriber list — usually in an abstract Publisher class
5. Create concrete Publisher classes — call `notify()` after every important state change
6. Implement `update()` in concrete Subscribers
7. Client creates Publisher and Subscribers, registers Subscribers with the Publisher

## Pros and cons

**Pros:**
- Open/Closed — new Subscriber classes without changes to Publisher code
- Ability to establish relationships between objects at runtime

**Cons:**
- Subscribers are notified in a random order

## Relations with other patterns

- **CoR**, **Command**, **Mediator**, and **Observer** all solve different ways of connecting senders and receivers:
  - Observer — dynamic subscribe/unsubscribe
- Difference between **Mediator** and **Observer**: Mediator's goal = eliminate mutual dependencies (central star); Observer's goal = dynamic one-to-many connections; both can be used simultaneously
- A popular **Mediator** implementation is based on **Observer** — Mediator as Publisher, components as Subscribers

## File structure

```
observer/
├── core/
│   ├── observer.interface.ts       # Observer<T> (update)
│   └── subject.interface.ts        # Subject<T> (subscribe, unsubscribe, notify)
├── order-store.publisher.ts        # Publisher — listener map + business methods
├── observers/
│   ├── email.observer.ts
│   ├── sms.observer.ts
│   └── analytics.observer.ts       # accumulates event log
└── index.ts                        # selective subscriptions + unsubscribe demo
```

**Run:** `npm run observer`
