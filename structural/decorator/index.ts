import { Notifier } from './core/notifier.interface';
import { BaseNotifier } from './components/base-notifier';
import { EmailDecorator } from './decorators/email.decorator';
import { SMSDecorator } from './decorators/sms.decorator';
import { SlackDecorator } from './decorators/slack.decorator';

function clientCode(notifier: Notifier, message: string): void {
    notifier.send(message);
}

console.log('--- BASIC NOTIFICATION ---');
clientCode(new BaseNotifier(), 'Server is down!');

console.log('\n--- EMAIL + APP ---');
const withEmail = new EmailDecorator(new BaseNotifier());
clientCode(withEmail, 'Server is down!');

console.log('\n--- EMAIL + SMS + APP ---');
const withEmailAndSMS = new SMSDecorator(new EmailDecorator(new BaseNotifier()));
clientCode(withEmailAndSMS, 'Server is down!');

console.log('\n--- ALL CHANNELS ---');
const allChannels = new SlackDecorator(
    new SMSDecorator(
        new EmailDecorator(
            new BaseNotifier()
        )
    )
);
clientCode(allChannels, 'Server is down!');
