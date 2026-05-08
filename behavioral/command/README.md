# Command

## What is it?

A pattern that **turns an action into an object**. Instead of directly calling a method, you create a Command object containing all the information about the request. The Invoker knows nothing about what the Command does — it only executes it.

## What problem does it solve?

When you need: undo/redo (each Command knows how to reverse itself), action queuing, operation logging, or separation of the sender (UI button) from the receiver (business logic).

## When to use?

- **You want to parameterize objects with operations** — store a Command as a field, swap it at runtime, pass it as an argument
- **You want to queue, schedule, or execute operations remotely** — Commands can be serialized, saved to a database, executed later
- **You want to implement reversible operations (undo/redo)** — Command history = stack of executed Commands

## Key mechanism

```ts
// Command interface — execute and undo
interface Command {
    execute(): void;
    undo(): void;
}

// Concrete Command — knows how to execute and reverse the action
class AddTextCommand implements Command {
    private insertedLength = 0;

    constructor(private doc: Document, private text: string) {}

    execute(): void {
        this.insertedLength = this.doc.insert(this.text);
    }

    undo(): void {
        this.doc.deleteLastChars(this.insertedLength);
    }
}

// Invoker — manages history, doesn't know Command details
class EditorInvoker {
    private history: Command[] = [];
    private undone: Command[] = [];

    execute(command: Command): void {
        command.execute();
        this.history.push(command);
        this.undone = []; // new action clears the redo stack
    }

    undo(): void {
        const cmd = this.history.pop();
        if (cmd) { cmd.undo(); this.undone.push(cmd); }
        else console.log('[Invoker] Nothing to undo');
    }

    redo(): void {
        const cmd = this.undone.pop();
        if (cmd) { cmd.execute(); this.history.push(cmd); }
    }
}
```

## How to implement?

1. Declare the Command interface with a single `execute()` method (and optionally `undo()`)
2. Extract requests into concrete Command classes — each stores arguments and a reference to the receiver
3. Identify Sender classes — add a Command field, Sender communicates only through the Command interface
4. Modify Senders — instead of directly calling the Receiver, they execute the Command
5. Initialization order: Receiver → Commands (pass Receiver) → Sender (pass Command)

## Pros and cons

**Pros:**
- Single Responsibility — separation of calling classes from executing classes
- Open/Closed — new Commands without changes to existing code
- Undo/redo implementation
- Deferred execution and queuing
- Ability to compose complex Commands from simple ones

**Cons:**
- New layer between sender and receiver — increased complexity

## Relations with other patterns

- **CoR**, **Command**, **Mediator**, and **Observer** all solve different ways of connecting senders and receivers
- Use **Command** and **Memento** together for undo: Commands execute operations, Memento saves state before execution
- **Command** and **Strategy** look similar — both parameterize an object with an action; difference: Command converts an operation into an object (queue, log, serialize), Strategy describes different ways of doing the same thing
- **Prototype** helps when saving copies of Commands to history
- **Visitor** is a more powerful version of Command — can execute operations on objects of different classes

## File structure

```
command/
├── core/
│   └── command.interface.ts        # Command (execute + undo)
├── receiver/
│   └── document.ts                 # Document — holds state (document content)
├── invoker/
│   └── editor.invoker.ts           # history, undo, redo
├── commands/
│   ├── add-text.command.ts         # execute: insert, undo: delete
│   └── delete-text.command.ts      # execute: delete n chars, undo: restore
└── index.ts                        # execute x3 → undo x3 → redo x2
```

**Run:** `npm run command`

## Command vs Memento for undo

| | Command | Memento |
|---|---|---|
| **How to undo?** | Command knows how to reverse itself | Restore saved state snapshot |
| **Complexity** | Each action needs reverse logic | Just save/restore state |
| **Better when** | Simple operations with clear inverses | Complex state, many variables at once |
