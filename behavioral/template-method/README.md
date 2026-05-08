# Template Method

## What is it?

A pattern that defines the **skeleton of an algorithm in a base class** and lets subclasses override specific steps — but not the structure. The order of steps is fixed in the template method (`export()`), subclasses only fill in the details.

## What problem does it solve?

When you have several variants of the same process with an identical structure but different details. Without Template Method: you copy the same code between classes changing only fragments. With Template Method: shared logic lives once in an abstract base class, subclasses override only what's different.

## When to use?

- **You want to let clients extend only specific steps of an algorithm**, but not its overall structure — CSV/JSON/PDF have the same flow: processData → header → body → footer
- **You have several classes with nearly identical algorithms with small differences** — extract common steps to a superclass; code that differs stays in subclasses
- Framework hooks — React lifecycle, Express middleware work on this principle

## Key mechanism

```ts
abstract class ReportExporter {
    // Template Method — inviolable step order
    export(data: ReportData): void {
        const processed = this.processData(data); // hook (optional override)
        this.writeHeader();                         // abstract (required override)
        this.writeBody(processed);                  // abstract (required override)
        this.writeFooter(processed);                // hook with default implementation
    }

    // Hook — subclass MAY override
    protected processData(data: ReportData): ReportData {
        return data; // default: no filtering
    }

    // Abstract — subclass MUST override
    protected abstract writeHeader(): void;
    protected abstract writeBody(data: ReportData): void;

    // Hook with sensible default
    protected writeFooter(data: ReportData): void {
        const total = data.reduce((sum, row) => sum + row.total, 0);
        console.log(`Total: $${total}`);
    }
}

// JsonExporter overrides hook — filters only paid orders
class JsonExporter extends ReportExporter {
    protected processData(data: ReportData): ReportData {
        return data.filter(row => row.status === 'paid');
    }
    protected writeHeader(): void { console.log('{"orders": ['); }
    protected writeBody(data: ReportData): void { /* JSON lines */ }
    protected writeFooter(data: ReportData): void { /* JSON total */ }
}

// PdfExporter does NOT override writeFooter — uses the default
class PdfExporter extends ReportExporter {
    protected writeHeader(): void { /* ASCII table header */ }
    protected writeBody(data: ReportData): void { /* ASCII table rows */ }
}
```

## Two types of methods

| Type | Keyword | Subclass |
|------|---------|----------|
| **Abstract** | `abstract` | Must override |
| **Hook** | none or default implementation | May override or leave as-is |

## How to implement?

1. Analyze the algorithm — which steps are common to all subclasses, which are always unique
2. Create an abstract base class and declare the template method + a set of `abstract` methods for steps; consider `final` on the template method to prevent subclasses from overriding it
3. Steps with default implementation — leave as non-abstract hooks
4. Add hooks between key algorithm steps
5. For each variant create a new concrete subclass — must implement abstract methods, may override hooks

## Pros and cons

**Pros:**
- Clients override only specific parts of the algorithm
- Extract duplicated code into the superclass

**Cons:**
- Clients may be constrained by the provided algorithm skeleton
- Possible Liskov Substitution violation when suppressing default implementations in subclasses
- Harder to maintain the more steps there are

## Relations with other patterns

- **Factory Method** is a specialization of **Template Method** — factory method is one step in the template algorithm
- **Template Method** relies on inheritance (static, fixed at compile time); **Strategy** relies on composition (dynamic, swappable at runtime)

## File structure

```
template-method/
├── report.abstract.ts          # ReportExporter — template method export() + hooks
├── exporters/
│   ├── csv.exporter.ts         # header: "id,total,status" | footer: ",,TOTAL:N"
│   ├── json.exporter.ts        # processData filters paid | JSON format
│   └── pdf.exporter.ts         # ASCII table | uses default footer
└── index.ts                    # same data → 3 different formats
```

**Run:** `npm run template-method`
