import { Notifier } from '../core/notifier.interface';

export class EmailDecorator implements Notifier {
    constructor(private wrapped: Notifier) {}

    send(message: string): void {
        this.wrapped.send(message);
        console.log(`[EMAIL] Sending email: ${message}`);
    }
}
