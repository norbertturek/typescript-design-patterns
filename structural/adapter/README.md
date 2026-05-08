# Adapter

## What is it?

A pattern that **translates the interface of one class into the interface expected by the client**. Like a power adapter — you don't change the plug or the socket, you add an intermediary that fits both.

## What problem does it solve?

When you have an external library or legacy code with a different interface than your system expects. You can't (or don't want to) modify the old code — you create an Adapter wrapping it and providing the correct interface.

## When to use?

- **You want to use an existing class, but its interface doesn't fit the rest of the code** — legacy logger has `writeInfo()`, new code expects `log()`
- **You want to reuse several existing subclasses** that lack common functionality that can't be added to the superclass — instead of duplicating code, create an Adapter wrapping the objects
- Third-party library integration (Stripe, Braintree) with different APIs

## Key mechanism

```ts
// New interface expected by the system
interface Logger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

// Old service with a different interface — we can't change it
class LegacyLoggerService {
    writeInfo(msg: string): void { console.log(`[INFO] ${msg}`); }
    writeWarning(msg: string): void { console.log(`[WARN] ${msg}`); }
    writeCritical(msg: string): void { console.log(`[CRIT] ${msg}`); }
}

// Adapter — implements the new interface, translates to the old one
class LegacyLoggerAdapter implements Logger {
    constructor(private legacyLogger: LegacyLoggerService) {}

    log(message: string): void { this.legacyLogger.writeInfo(message); }
    warn(message: string): void { this.legacyLogger.writeWarning(message); }
    error(message: string): void { this.legacyLogger.writeCritical(message); }
}

// Client uses Logger — doesn't know LegacyLoggerService is inside
const logger: Logger = new LegacyLoggerAdapter(new LegacyLoggerService());
logger.log('Order placed');    // → writeInfo('Order placed')
logger.error('Payment failed'); // → writeCritical('Payment failed')
```

## How to implement?

1. Make sure you have two classes with incompatible interfaces: service (can't change) + client (expects a different interface)
2. Declare the client interface describing how the client communicates with the service
3. Create the Adapter class implementing the client interface, leave methods empty
4. Add a field in the Adapter holding a reference to the service (initialized via constructor)
5. Implement methods — Adapter delegates to the service, handling interface/data conversion
6. Clients use the Adapter through the client interface

## Pros and cons

**Pros:**
- Single Responsibility — separation of interface conversion from business logic
- Open/Closed — new Adapters without modifying existing code

**Cons:**
- Increased complexity — new interfaces and classes; sometimes simpler to change the service directly

## Relations with other patterns

- **Bridge** designed upfront for independent development; **Adapter** applied as a retrofit to existing code
- **Adapter** gives a completely different interface; **Decorator** preserves or extends the same one; **Proxy** preserves the same one
- **Facade** defines a new interface for a subsystem; **Adapter** tries to make an existing interface usable

## File structure

```
adapter/
├── core/
│   └── logger.interface.ts             # Logger (log, warn, error) — new contract
├── legacy/
│   └── legacy-logger.service.ts        # old service (writeInfo, writeWarning, writeCritical)
├── adapters/
│   └── legacy-logger.adapter.ts        # translates Logger → LegacyLoggerService
└── index.ts
```

**Run:** `npm run adapter`

## Comparison with similar patterns

| Pattern | Output interface | Objects | Goal |
|---------|-----------------|---------|------|
| **Adapter** | Different from input | 1 | Interface conversion |
| **Decorator** | Same | 1, stackable | Adding behavior |
| **Proxy** | Same | 1 | Access control |
| **Facade** | New, simplified | Subsystem | Hiding complexity |
