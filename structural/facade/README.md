# Facade

## What is it?

A pattern that provides a **simplified interface** to a complex subsystem. Instead of the client knowing about Inventory, Payment, Shipping, and Notification — it calls one `placeOrder()` method and Facade coordinates the rest.

## What problem does it solve?

When a subsystem has many classes with complex dependencies, and the client only needs a few high-level operations. Facade doesn't hide the subsystem — it can still be used directly — but it provides a simple path for common operations.

## When to use?

- **You need a limited, simple interface to a complex subsystem** — one `placeOrder()` instead of 5 service calls
- **You want to structure a subsystem into layers** — Facade as the entry point for each layer, reducing coupling between layers
- Third-party libraries — Facade as an abstraction layer separating your code from the external API

## Key mechanism

```ts
class OrderFacade {
    constructor(
        private inventory: IInventoryService,
        private payment: IPaymentService,
        private shipping: IShippingService,
        private notification: INotificationService,
    ) {}

    // Client calls ONE method — Facade coordinates the rest
    placeOrder(productId: string, amount: number, cardToken: string, address: string, email: string): void {
        if (!this.inventory.checkStock(productId)) {
            console.log('Order failed: out of stock');
            return;
        }
        if (!this.payment.charge(amount, cardToken)) {
            console.log('Order failed: payment declined');
            return;
        }
        this.inventory.reserveProduct(productId);
        const trackingId = this.shipping.createShipment(productId, address);
        this.notification.sendConfirmation(email, trackingId);
        console.log('Order completed');
    }
}

// Client — one object, one method, zero knowledge of services
const facade = new OrderFacade(inventory, payment, shipping, notification);
facade.placeOrder('IPHONE-15', 999, 'tok_visa', '123 Main Street, New York', 'user@example.com');
```

## How to implement?

1. Check if you can provide a simpler interface than the subsystem — whether it decouples the client from many classes
2. Declare and implement this interface in a new Facade class — Facade initializes the subsystem and manages its lifecycle
3. Make the client communicate with the subsystem exclusively through Facade — protects it from changes
4. If Facade gets too large — extract part of the behavior into a new, refined Facade

## Pros and cons

**Pros:**
- Isolate code from subsystem complexity

**Cons:**
- Facade can become a God Object tied to all application classes

## Relations with other patterns

- **Facade** defines a new interface for existing objects; **Adapter** tries to make an existing interface usable
- **Abstract Factory** can replace **Facade** when you only want to hide how subsystem objects are created
- **Facade** and **Mediator** have similar goals — organizing collaboration among many classes; difference: subsystem services don't know about Facade and can communicate directly; components know the Mediator and communicate exclusively through it
- **Facade** can often be turned into a **Singleton** — one facade object is enough

## File structure

```
facade/
├── services/
│   ├── inventory.service.ts        # checkStock, reserveProduct
│   ├── payment.service.ts          # charge(amount, token)
│   ├── shipping.service.ts         # createShipment → trackingId
│   └── notification.service.ts     # sendConfirmation(email, trackingId)
├── facade/
│   └── order.facade.ts             # placeOrder() — coordinates all services
└── index.ts
```

**Run:** `npm run facade`

## Facade vs Mediator

| | Facade | Mediator |
|---|---|---|
| **Goal** | Simplified interface to the subsystem | Coordinate communication between components |
| **Do services know about it?** | No — Facade calls them one-way | Yes — components call `mediator.notify()` |
| **Direction** | Client → Facade → Services | Bidirectional: component ↔ Mediator |
