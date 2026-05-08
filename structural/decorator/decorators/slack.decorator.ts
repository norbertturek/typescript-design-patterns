import { Notifier } from '../core/notifier.interface';

export class SlackDecorator implements Notifier {
    constructor(private wrapped: Notifier) {}

    send(message: string): void {
        this.wrapped.send(message);
        console.log(`[SLACK] Posting to Slack: ${message}`);
    }
}
