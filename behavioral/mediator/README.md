# Mediator

## What is it?

A pattern that **centralizes communication** between components. Instead of every component talking directly to every other (spaghetti of references) — all components "talk" only to the Mediator, which coordinates the next steps. Analogy: air traffic control tower — planes don't communicate with each other, only with the tower.

## What problem does it solve?

When you have several tightly coupled components — changing one requires changing others. Without Mediator: Stock knows about Payment, Payment knows about Notification, etc. With Mediator: each component only knows the Mediator and calls `mediator.notify()`.

## When to use?

- **It's hard to change some classes because they're tightly coupled with others** — Mediator extracts all relationships into one place
- **You can't reuse a component in another program because it's too dependent on others** — after Mediator, components only know the Mediator and can easily be reused with a different Mediator
- **You're creating tons of component subclasses just to reuse basic behavior** — instead, define new relationships in a new Mediator
- Business flow: order → reservation → payment → notification; UI forms

## Key mechanism

```ts
// Components only know the Mediator — they don't know each other
class StockComponent {
    constructor(private mediator: Mediator) {}

    checkAndReserve(productId: string): void {
        const inStock = /* check */ true;
        if (inStock) {
            this.mediator.notify('Stock', 'reserved');
        } else {
            this.mediator.notify('Stock', 'outOfStock');
        }
    }
}

// Mediator — knows who reacts to what
class OrderMediator implements Mediator {
    notify(sender: string, event: string): void {
        if (sender === 'Stock' && event === 'reserved') {
            this.payment.charge(order.amount, order.cardToken);
        }
        if (sender === 'Payment' && event === 'charged') {
            this.notification.sendConfirmation(order.email, order.productId);
        }
        if (sender === 'Payment' && event === 'declined') {
            this.notification.sendPaymentFailed(order.email);
        }
    }
}
```

## Flow in the example

```
placeOrder()
  → Stock.checkAndReserve()
    → mediator.notify('Stock', 'reserved')
      → Payment.charge()
        → mediator.notify('Payment', 'charged')
          → Notification.sendConfirmation()
```

## How to implement?

1. Identify a group of tightly coupled classes that would benefit from independence
2. Declare the Mediator interface with a `notify(sender, event, data?)` method — one method is enough
3. Implement the concrete Mediator class — store references to all components
4. Components store a reference to the Mediator (via constructor)
5. Change component code — instead of calling other components' methods, call `mediator.notify()`

## Pros and cons

**Pros:**
- Single Responsibility — communication between components in one place
- Open/Closed — new Mediators without changes to components
- Reduced coupling between components
- Easier component reuse

**Cons:**
- Over time, the Mediator can evolve into a God Object

## Relations with other patterns

- **CoR**, **Command**, **Mediator**, and **Observer** all solve different ways of connecting senders and receivers
- **Facade** and **Mediator** have similar goals: Facade gives a simplified interface to a subsystem (services don't know about Facade, can communicate directly); Mediator centralizes communication (components only know the Mediator, don't communicate directly)
- The difference between **Mediator** and **Observer** is often elusive: Mediator's goal = eliminate mutual dependencies (components depend only on Mediator); Observer's goal = dynamic one-to-many connections

## File structure

```
mediator/
├── core/
│   └── mediator.interface.ts           # Mediator (notify)
├── components/
│   ├── stock.component.ts              # reserves, calls mediator
│   ├── payment.component.ts            # charges card, calls mediator
│   └── notification.component.ts       # sends email
├── order.mediator.ts                   # knows all components, coordinates flow
└── index.ts                            # 3 scenarios: success, out of stock, declined card
```

**Run:** `npm run mediator`

## Mediator vs Observer

| | Mediator | Observer |
|---|---|---|
| **Structure** | Central coordinator (star) | Pub/Sub (many-to-many) |
| **Flow** | Fixed, sequential | Open — subscribers react independently |
| **Components know** | Only the Mediator | Publisher (or fully decoupled) |
