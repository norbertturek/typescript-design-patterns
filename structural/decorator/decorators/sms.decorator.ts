import { Notifier } from '../core/notifier.interface';

export class SMSDecorator implements Notifier {
    constructor(private wrapped: Notifier) {}

    send(message: string): void {
        this.wrapped.send(message);
        console.log(`[SMS] Sending SMS: ${message}`);
    }
}
