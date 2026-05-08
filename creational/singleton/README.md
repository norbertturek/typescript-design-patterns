# Singleton

## What is it?

A pattern that **guarantees the existence of exactly one instance of a class** and provides a global access point to it. The constructor is private — the only way to get an instance is through the static `getInstance()` method.

> ⚠️ **Singleton is considered an anti-pattern** in modern TypeScript. It violates SRP, hides dependencies, and makes testing difficult. **Prefer Dependency Injection** — a DI container (e.g. NestJS) guarantees a single instance with explicit dependencies.

## What problem does it solve?

When you need exactly one object of a given type in the entire application — e.g. a database connection, logger, configuration. Without Singleton: every `new Config()` creates a new object — possible inconsistencies.

## When to use?

- **Exactly one instance for all clients** — shared DB connection, in-memory cache, configuration
- **Stricter control over global variables** — Singleton guarantees one instance and allows lazy initialization
- When a DI container is not available (simple script, CLI)

## Key mechanism

```ts
class Database {
    private static instance: Database | null = null;
    private connectionCount = 0;

    // Private constructor — no one outside can call new Database()
    private constructor(private url: string) {
        console.log(`[DB] Connected to ${url}`);
    }

    // The only way to get an instance — lazy initialization
    static getInstance(url: string): Database {
        if (!Database.instance) {
            Database.instance = new Database(url);
        }
        return Database.instance; // always the same object
    }

    query(sql: string): void {
        console.log(`[DB] Query #${++this.connectionCount}: ${sql}`);
    }
}

const db1 = Database.getInstance('postgres://localhost/mydb');
const db2 = Database.getInstance('postgres://localhost/mydb');
console.log(db1 === db2); // true — same instance
```

## How to implement?

1. Add a private static `instance` field to the class
2. Declare a public static `getInstance()` method
3. Implement lazy initialization — create the object on the first call, return the existing one on subsequent calls
4. Make the constructor private
5. Replace all direct `new ClassName()` calls with `getInstance()`

## Pros and cons

**Pros:**
- Certainty that the class has only one instance
- Global access point
- Lazy initialization — object created only when needed

**Cons:**
- Violates Single Responsibility — class manages its instance + does its own job
- Masks bad design — hidden dependencies between components
- Multithreading issues — two threads can simultaneously pass `instance === null`
- Hard to test — private constructor, global state between tests

## Singleton vs Dependency Injection

```ts
// Singleton — hidden dependency, hard to mock
class OrderService {
    process(): void {
        Database.getInstance('...').query('INSERT...'); // how to mock in tests?
    }
}

// DI — explicit dependency, easy to test
class OrderService {
    constructor(private db: Database) {}

    process(): void {
        this.db.query('INSERT...'); // in tests: new OrderService(mockDb)
    }
}
```

In NestJS/Angular you register a service as a singleton in the DI container — guaranteeing one instance without the drawbacks of the classic Singleton.

## Relations with other patterns

- **Facade** can often be a Singleton — one facade object is enough for the entire application
- **Flyweight** vs **Singleton**: Flyweight can have multiple instances with different states; Singleton — always one; Singleton can be mutable, Flyweight is immutable
- **Abstract Factory**, **Builder**, and **Prototype** can be implemented as Singleton

> No runnable example — Singleton is treated as an anti-pattern in this repo. Prefer DI containers (NestJS, InversifyJS) for managing shared instances.
