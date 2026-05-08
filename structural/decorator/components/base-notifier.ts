import { Notifier } from '../core/notifier.interface';

export class BaseNotifier implements Notifier {
    send(message: string): void {
        console.log(`[APP] ${message}`);
    }
}
