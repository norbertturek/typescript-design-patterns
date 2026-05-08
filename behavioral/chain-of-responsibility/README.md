# Chain of Responsibility

## What is it?

A pattern that creates a **chain of handlers** — each decides whether to process a request or pass it along. The client sends a request to the first link and doesn't know who will ultimately handle it.

## What problem does it solve?

When you have a sequence of validations/steps that must run in order, and you don't want one big function with many `if` statements. Each handler is a separate class — easy to test, add, and reorder.

## When to use?

- **The program must handle different requests in different ways, but types and order are unknown upfront** — each handler can decide to process or pass along
- **It's critical to execute several handlers in a specific order** — you can arrange them in any order
- **The set of handlers and their order should change at runtime** — setters on handler fields allow dynamic chain reorganization
- Validation pipeline: auth → stock → fraud → payment; Express middleware; DOM event bubbling

## Key mechanism

```ts
// Base handler — if it doesn't handle, delegates to the next
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler; // enables chaining: a.setNext(b).setNext(c)
    }

    handle(request: OrderRequest): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

// Concrete handler — blocks on error, passes through when OK
class AuthHandler extends AbstractHandler {
    handle(request: OrderRequest): string | null {
        if (!request.isAuthenticated) {
            return `[Auth] BLOCKED: ${request.userId} not authenticated`;
        }
        return super.handle(request); // pass along
    }
}

// Building the chain
auth.setNext(stock).setNext(payment).setNext(fraud);

// Invocation
chain.handle(request); // passes through auth → stock → payment → fraud
```

## How to implement?

1. Declare the Handler interface with a method to handle requests — ideally accepting a request object (DTO)
2. Create an abstract base class with a `nextHandler` field and default `handle()` implementation that delegates to the next
3. Create concrete handlers as subclasses — each makes two decisions: whether to process and whether to pass along
4. Client assembles the chain manually or gets it from a factory
5. Client can invoke any handler in the chain, not just the first

## Pros and cons

**Pros:**
- Control over the order of request handling
- Single Responsibility — each handler is responsible for one check
- Open/Closed — new handlers without changes to existing code

**Cons:**
- Some requests may go unhandled (reach the end of the chain with no handler)

## Relations with other patterns

- **CoR**, **Command**, **Mediator**, and **Observer** all solve different ways of connecting senders and receivers:
  - CoR — passes sequentially through the chain until someone handles it
  - Command — one-way sender → receiver connection
  - Mediator — eliminates direct connections, forces communication through the mediator
  - Observer — dynamic subscriptions
- Handlers in CoR can be implemented as **Commands** — execute operations on the same context
- **CoR** and **Decorator** have very similar class structures — both pass the call through a series of objects; difference: CoR can stop the flow, Decorator cannot

## File structure

```
chain-of-responsibility/
├── core/
│   ├── handler.abstract.ts         # Handler interface + AbstractHandler (setNext + handle)
│   └── order-request.ts            # OrderRequest DTO
├── handlers/
│   ├── auth.handler.ts             # blocks if !isAuthenticated
│   ├── stock.handler.ts            # blocks if !inStock
│   ├── fraud.handler.ts            # blocks if isFraudulent
│   └── payment.handler.ts          # last link in the chain
└── index.ts
```

**Run:** `npm run chain-of-responsibility`
