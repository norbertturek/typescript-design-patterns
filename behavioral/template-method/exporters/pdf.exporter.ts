import { ReportExporter, ReportData } from '../report.abstract';

export class PdfExporter extends ReportExporter {
    protected writeHeader(): void {
        console.log('=== ORDER REPORT ===');
        console.log('ID          | Total  | Status');
        console.log('------------|--------|--------');
    }

    protected writeBody(data: ReportData): void {
        data.forEach(row =>
            console.log(`${row.id.padEnd(12)}| $${String(row.total).padEnd(6)}| ${row.status}`)
        );
    }
    // writeFooter NOT overridden — uses base class default
}
