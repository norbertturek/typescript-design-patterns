# Proxy

## What is it?

A pattern that **substitutes a stand-in** in place of the real object. Proxy implements the same interface as the original — the client doesn't know it's talking to a Proxy. Proxy controls access and can add: caching, logging, authorization, lazy initialization.

## What problem does it solve?

When you want to control access to an object or add behavior (cache, auth, log) without modifying its code and without the client's knowledge. The client uses the same interface — Proxy substitutes itself transparently.

## When to use?

- **Lazy initialization (Virtual Proxy)** — heavy object created only when needed, not at application startup
- **Access control (Protection Proxy)** — pass the request only when the client has the appropriate permissions
- **Caching (Caching Proxy)** — cache results of expensive operations, manage cache lifecycle
- **Logging (Logging Proxy)** — log every request to the service
- **Remote Proxy** — hide network communication behind a local interface

## Key mechanism

```ts
// Same interface — Proxy and real service both implement it
interface IProductService {
    getProduct(id: string): string;
    isAllowed(role: string): boolean;
}

// Caching Proxy — transparent caching
class CachingProxy implements IProductService {
    private cache = new Map<string, string>();

    constructor(private service: IProductService) {}

    getProduct(id: string): string {
        if (this.cache.has(id)) {
            console.log(`[Cache] Hit for ${id}`);
            return this.cache.get(id)!;
        }
        const result = this.service.getProduct(id); // delegate to real service
        this.cache.set(id, result);
        console.log(`[Cache] Cached result for ${id}`);
        return result;
    }

    isAllowed(role: string): boolean {
        return this.service.isAllowed(role); // delegate unchanged
    }
}

// Protection Proxy — checks permissions
class ProtectionProxy implements IProductService {
    constructor(private service: IProductService, private userRole: string) {}

    getProduct(id: string): string {
        if (!this.service.isAllowed(this.userRole)) {
            throw new Error('Access denied');
        }
        return this.service.getProduct(id);
    }

    isAllowed(role: string): boolean {
        return this.service.isAllowed(role);
    }
}

// Client doesn't know whether it's talking to a Proxy or a real service
const service: IProductService = new CachingProxy(new ProductService());
service.getProduct('IPHONE-15'); // network + cache
service.getProduct('IPHONE-15'); // cache only
```

## How to implement?

1. If a service interface doesn't exist — create one so Proxy and service are interchangeable
2. Create the Proxy class with a field holding a reference to the service
3. Implement Proxy methods — after doing their own work, delegate to the service
4. Consider a factory method deciding whether the client gets the Proxy or real service
5. Consider lazy initialization of the service inside the Proxy

## Pros and cons

**Pros:**
- Control the service without clients knowing
- Manage service lifecycle when clients don't care
- Proxy works even when the service is unavailable (e.g. remote proxy with retry)
- Open/Closed — new Proxies without changes to the service and clients

**Cons:**
- Increased complexity — new classes
- Service response may be delayed

## Relations with other patterns

- **Adapter** gives a different interface; **Proxy** preserves the same one; **Decorator** extends the same one
- **Facade** and **Proxy** both buffer a complex entity; but Facade gives a simplified interface to the subsystem, Proxy preserves an identical interface to the service
- **Decorator** and **Proxy** have similar structures but different intents: Proxy manages service lifecycle; Decorator is always controlled by the client

## File structure

```
proxy/
├── core/
│   └── product-service.interface.ts    # IProductService (getProduct, isAllowed)
├── services/
│   └── product.service.ts              # real service
├── proxies/
│   ├── caching.proxy.ts                # Map cache + delegation
│   └── protection.proxy.ts             # checks isAllowed() before getProduct()
└── index.ts
```

**Run:** `npm run proxy`

## Proxy variants

| Variant | What it does |
|---------|-------------|
| **Virtual** | Lazy initialization — creates the heavy object only when needed |
| **Protection** | Checks permissions before delegation |
| **Caching** | Cache results, key = request parameters |
| **Remote** | Hides network communication |
| **Logging** | Logs every request before/after delegation |
| **Smart ref** | Releases resources when no active clients |
