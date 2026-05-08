import { Mediator } from '../core/mediator.interface';

export class PaymentComponent {
    constructor(private mediator: Mediator) {}

    charge(amount: number, cardToken: string): boolean {
        const success = cardToken.startsWith('tok_valid');
        if (!success) {
            console.log(`[Payment] Card "${cardToken}" declined`);
            this.mediator.notify('Payment', 'declined', { amount, cardToken });
            return false;
        }
        console.log(`[Payment] Charged $${amount} on "${cardToken}"`);
        this.mediator.notify('Payment', 'charged', { amount, cardToken });
        return true;
    }
}
