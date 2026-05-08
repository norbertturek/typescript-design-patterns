import { ReportExporter, ReportData } from '../report.abstract';

export class CsvExporter extends ReportExporter {
    protected writeHeader(): void {
        console.log('id,total,status');
    }

    protected writeBody(data: ReportData): void {
        data.forEach(row => console.log(`${row.id},${row.total},${row.status}`));
    }

    protected writeFooter(data: ReportData): void {
        const total = data.reduce((sum, row) => sum + row.total, 0);
        console.log(`,,TOTAL:${total}`);
    }
}
