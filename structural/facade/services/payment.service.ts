export interface IPaymentService {
    charge(amount: number, cardToken: string): boolean;
}

export class PaymentService implements IPaymentService {
    charge(amount: number, cardToken: string): boolean {
        console.log(`[PAYMENT] Charging $${amount} using card token ${cardToken}...`);
        return true;
    }
}
