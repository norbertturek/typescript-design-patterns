# Decorator

## What is it?

A pattern that **wraps an object in successive layers of behavior** — like an onion. Each Decorator implements the same interface as the object it wraps, so they can be stacked arbitrarily. `Email(Slack(SMS(base)))` calls all layers in order from the inside out.

## What problem does it solve?

When you want to dynamically add behaviors to an object without a subclass explosion. Without Decorator: `EmailSmsNotifier`, `EmailSlackNotifier`, `EmailSmsSlackNotifier`... With Decorator: each channel is a separate class, you compose them freely at runtime.

## When to use?

- **You want to add behaviors to objects without affecting other objects of the same class** — only a specific instance gets a new layer
- **You can't use inheritance** — the class is `final` or extension would lead to a combinatorial explosion
- Notification system (SMS + Email + Slack in any combination), middleware pipeline, Stream I/O

## Key mechanism

```ts
// Interface — Decorator and Base must both implement it
interface Notifier {
    send(message: string): void;
}

// Base — basic implementation
class BaseNotifier implements Notifier {
    send(message: string): void {
        console.log(`[BASE] ${message}`);
    }
}

// Decorator — wraps another Notifier, adds its own behavior
class EmailDecorator implements Notifier {
    constructor(private wrapped: Notifier) {}

    send(message: string): void {
        this.wrapped.send(message);          // call what's inside
        console.log(`[EMAIL] ${message}`);   // add own behavior
    }
}

class SmsDecorator implements Notifier {
    constructor(private wrapped: Notifier) {}
    send(message: string): void {
        this.wrapped.send(message);
        console.log(`[SMS] ${message}`);
    }
}

// Stacking — Email(Slack(SMS(base)))
const notifier = new EmailDecorator(
    new SlackDecorator(
        new SmsDecorator(new BaseNotifier())
    )
);

notifier.send('Order placed');
// [BASE] → [SMS] → [SLACK] → [EMAIL]  (inside out)
```

## How to implement?

1. Make sure your domain can be represented by one component with several optional layers
2. Declare the component interface with common methods
3. Create the base class implementing the interface
4. Create a base Decorator class implementing the interface and containing a `wrapped: Component` field
5. Create concrete Decorator classes — each adds its own behavior before or after calling `wrapped.method()`
6. Client wraps the base component in zero or more Decorators

## Pros and cons

**Pros:**
- Extend object behavior without creating subclasses
- Add/remove behaviors at runtime
- Combine multiple behaviors by stacking
- Single Responsibility — each Decorator is responsible for one extension

**Cons:**
- Hard to remove a specific wrapper from the stack
- Hard to configure when Decorator order matters
- Many small classes

## Relations with other patterns

- **Adapter** gives an object a completely different interface; **Decorator** preserves or extends the same one
- **Composite** and **Decorator** have similar structures — both rely on recursive composition; Decorator has one child and adds behavior, Composite sums multiple children
- **Decorator** changes the "skin" of an object; **Strategy** changes its "guts"
- **Chain of Responsibility** and **Decorator** have similar structures; CoR handlers can stop the flow, Decorator should not

## File structure

```
decorator/
├── core/
│   └── notifier.interface.ts       # Notifier (send)
├── components/
│   └── base-notifier.ts            # Base — basic log
├── decorators/
│   ├── email.decorator.ts          # wrapped.send() + email log
│   ├── sms.decorator.ts
│   └── slack.decorator.ts
└── index.ts
```

**Run:** `npm run decorator`
