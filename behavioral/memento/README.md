# Memento

## What is it?

A pattern that allows **saving and restoring the previous state of an object** without violating its encapsulation. The object itself creates a "snapshot" of its state — the Caretaker stores it but cannot read it.

## What problem does it solve?

When you need undo/redo and the state is complex. The alternative would be to expose the object's fields — that breaks encapsulation. Memento lets the object "pack" its own state into an opaque token. Also useful for transactions — rollback to state before an operation.

## When to use?

- **You want to create snapshots of an object's state to restore a previous state** — undo in an editor, game save, transaction rollback
- **Direct access to fields/getters would violate encapsulation** — Memento makes the object responsible for its own snapshot; no one else can read it

## Three roles

| Role | Class | Responsibility |
|------|-------|----------------|
| **Originator** | `Editor` | Creates (`save()`) and restores (`restore()`) its state |
| **Memento** | `EditorMemento` | Stores state — only the Originator can read it |
| **Caretaker** | `History` | Holds the Memento stack, calls `save()` and `undo()` |

## Key mechanism

```ts
// Originator — holds state and knows how to pack/unpack it
class Editor {
    private content = '';
    private cursorPosition = 0;

    type(text: string): void {
        this.content = this.content.slice(0, this.cursorPosition) + text + this.content.slice(this.cursorPosition);
        this.cursorPosition += text.length;
    }

    save(): EditorMemento {
        return new EditorMemento(this.content, this.cursorPosition, new Date());
    }

    restore(memento: EditorMemento): void {
        this.content = memento.getContent();
        this.cursorPosition = memento.getCursorPosition();
    }
}

// Caretaker — manages history, doesn't peek inside Memento
class History {
    private snapshots: EditorMemento[] = [];

    save(): void {
        this.snapshots.push(this.editor.save());
        console.log('[History] Snapshot saved');
    }

    undo(): void {
        if (this.snapshots.length === 0) { console.log('[History] Nothing to undo'); return; }
        const memento = this.snapshots.pop()!;
        this.editor.restore(memento);
    }

    constructor(private editor: Editor) {}
}
```

## Flow

```
editor.type('Hello')    → history.save()  → snapshots: [snap1]
editor.type(', World')  → history.save()  → snapshots: [snap1, snap2]
editor.delete(8)        → (no save)
history.undo()          → restore(snap2)  → "Hello, World"
history.undo()          → restore(snap1)  → "Hello"
history.undo()          → "Nothing to undo"
```

## How to implement?

1. Decide which class plays the Originator role
2. Create the Memento class — fields mirror the Originator's fields, the class is immutable (constructor only, no setters)
3. If the language supports nested classes — nest Memento inside Originator; if not — extract an empty interface
4. Add `save()` to Originator — passes state via Memento's constructor
5. Add `restore(memento)` to Originator
6. Caretaker decides when to save, stores snapshots, restores when needed

## Pros and cons

**Pros:**
- State snapshots without violating encapsulation
- Simplification of Originator code — Caretaker manages history

**Cons:**
- High RAM usage if clients create Mementos too frequently
- Caretaker must track Originator lifecycle to destroy outdated Mementos
- Dynamic languages (JS/TS) cannot guarantee that state inside Memento remains unchanged

## Relations with other patterns

- **Command** + **Memento** together for undo: Commands execute operations, Memento saves state before execution
- **Memento** + **Iterator**: save iteration state and rewind if needed
- Sometimes **Prototype** can replace **Memento** if the state is simple and has no links to external resources

## File structure

```
memento/
├── editor.memento.ts       # EditorMemento — content + cursorPosition + timestamp
├── editor.originator.ts    # Editor — type, delete, save(), restore()
├── history.caretaker.ts    # History — snapshots[], save(), undo()
└── index.ts                # type x3 → delete → undo x3
```

**Run:** `npm run memento`
