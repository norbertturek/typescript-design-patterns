import { OrderState } from './core/order-state.interface';
import { PendingState } from './states/pending.state';

export class Order {
    private state: OrderState;

    constructor(public readonly id: string) {
        this.state = new PendingState();
    }

    setState(state: OrderState): void {
        console.log(`  [Order ${this.id}] ${this.state.getStatus()} → ${state.getStatus()}`);
        this.state = state;
    }

    getStatus(): string {
        return this.state.getStatus();
    }

    pay(): void      { this.state.pay(this);     }
    ship(): void     { this.state.ship(this);    }
    deliver(): void  { this.state.deliver(this); }
    cancel(): void   { this.state.cancel(this);  }
}
