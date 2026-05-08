export type ReportData = { id: string; total: number; status: string }[];

export abstract class ReportExporter {
    // template method — algorithm skeleton, not to be overridden
    export(data: ReportData): void {
        const processed = this.processData(data);
        this.writeHeader();
        this.writeBody(processed);
        this.writeFooter(processed);
        console.log(`[${this.constructor.name}] Export complete.\n`);
    }

    // hook — optional override, returns data unchanged by default
    protected processData(data: ReportData): ReportData {
        return data;
    }

    // abstract steps — subclasses must implement
    protected abstract writeHeader(): void;
    protected abstract writeBody(data: ReportData): void;

    // hook with a sensible default implementation
    protected writeFooter(data: ReportData): void {
        const total = data.reduce((sum, row) => sum + row.total, 0);
        console.log(`  TOTAL: $${total}`);
    }
}
