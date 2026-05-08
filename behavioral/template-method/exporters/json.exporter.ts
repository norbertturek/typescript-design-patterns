import { ReportExporter, ReportData } from '../report.abstract';

export class JsonExporter extends ReportExporter {
    // overrides hook — filters only paid orders
    protected processData(data: ReportData): ReportData {
        return data.filter(row => row.status === 'paid');
    }

    protected writeHeader(): void {
        console.log('{"orders": [');
    }

    protected writeBody(data: ReportData): void {
        const lines = data.map(row => `  ${JSON.stringify(row)}`).join(',\n');
        console.log(lines);
    }

    protected writeFooter(data: ReportData): void {
        const total = data.reduce((sum, row) => sum + row.total, 0);
        console.log(`], "total": ${total}}`);
    }
}
