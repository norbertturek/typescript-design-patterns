# State

## What is it?

A pattern that lets an object **change its behavior when its internal state changes**. Each state is a separate class implementing the same interface. It looks as if the object changed its class.

## What problem does it solve?

When an object has many states and method behavior depends on the current state. Without State: `if (status === 'pending') { ... } else if (status === 'shipped') { ... }` — in every method. With State: each state class contains only its own behavior.

## When to use?

- **An object behaves differently depending on state, there are many states, and state-dependent code changes often** — extract into separate classes
- **The class is "polluted" with large conditionals** modifying behavior — replace with state class methods
- **Lots of duplicated code across similar states and transitions** — extract common behavior into an abstract base state class
- Order (pending → processing → shipped → delivered), media player (playing/paused/stopped), document (draft/review/published)

## Key mechanism

```ts
// Context holds a reference to the current state
class Order {
    private state: OrderState;

    constructor(public readonly id: string) {
        this.state = new PendingState(); // initial state
    }

    setState(state: OrderState): void {
        console.log(`[Order] ${this.state.getStatus()} → ${state.getStatus()}`);
        this.state = state;
    }

    // Delegates to the current state
    pay(): void { this.state.pay(this); }
    ship(): void { this.state.ship(this); }
    deliver(): void { this.state.deliver(this); }
    cancel(): void { this.state.cancel(this); }
}

// State transitions itself to the next state
class PendingState implements OrderState {
    pay(order: Order): void {
        order.setState(new ProcessingState()); // transition
    }
    ship(order: Order): void {
        console.log('[Pending] Cannot ship — not paid yet');
    }
    cancel(order: Order): void {
        order.setState(new CancelledState());
    }
    getStatus(): string { return 'Pending'; }
}
```

## State diagram

```
PendingState ──pay()──→ ProcessingState ──ship()──→ ShippedState ──deliver()──→ DeliveredState
     │                        │
  cancel()                 cancel()
     ↓                        ↓
CancelledState           CancelledState
```

## How to implement?

1. Decide which class plays the Context role
2. Declare the State interface with methods for each possible state-dependent behavior
3. For each state create a class implementing the State interface
4. Possible issues: state methods may need access to private Context fields → consider public getters or nested state classes
5. Add a field of type State interface to Context and a public setter
6. Replace conditionals in Context methods with calls to the corresponding state object methods
7. State transitions: create a new state instance and pass to `setState()` — from Context, from the state, or from the client

## Pros and cons

**Pros:**
- Single Responsibility — code related to a specific state in a separate class
- Open/Closed — new states without changes to existing classes or Context
- Elimination of large conditionals from Context

**Cons:**
- Overkill if the state machine has only a few states or rarely changes

## Relations with other patterns

- **Bridge**, **State**, **Strategy** (and partly **Adapter**) have very similar structures — all are based on composition, delegating work to other objects; they differ in the problems they solve
- **State** is an extension of **Strategy**: both rely on composition; **Strategy** makes objects independent of each other; **State** doesn't restrict dependencies between states — a state can change the Context's state

## File structure

```
state/
├── core/
│   └── order-state.interface.ts    # OrderState (pay, ship, deliver, cancel, getStatus)
├── states/
│   ├── pending.state.ts            # pay→Processing, cancel→Cancelled
│   ├── processing.state.ts         # ship→Shipped, cancel→Cancelled
│   ├── shipped.state.ts            # deliver→Delivered
│   ├── delivered.state.ts          # terminal state — everything→error
│   └── cancelled.state.ts          # terminal state — everything→error
├── order.context.ts                # Order — holds state, delegates calls
└── index.ts
```

**Run:** `npm run state`

## State vs Strategy

| | State | Strategy |
|---|---|---|
| **Who changes state/strategy?** | State changes itself (`setState(new X())`) | Client swaps it (`setStrategy(new X())`) |
| **Do states/strategies know about each other?** | Yes — state knows the next | No — strategies are independent |
| **Goal** | State machine | Swappable algorithms |
