import { CsvExporter } from './exporters/csv.exporter';
import { JsonExporter } from './exporters/json.exporter';
import { PdfExporter } from './exporters/pdf.exporter';
import { ReportData } from './report.abstract';

const data: ReportData = [
    { id: 'ORD-001', total: 249, status: 'paid' },
    { id: 'ORD-002', total: 99,  status: 'pending' },
    { id: 'ORD-003', total: 399, status: 'paid' },
];

console.log('=== CSV ===\n');
new CsvExporter().export(data);

console.log('=== JSON (only paid) ===\n');
new JsonExporter().export(data);

console.log('=== PDF ===\n');
new PdfExporter().export(data);
