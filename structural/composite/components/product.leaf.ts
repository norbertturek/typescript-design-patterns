import { OrderComponent } from '../core/component.interface';

export class Product implements OrderComponent {
    constructor(
        private name: string,
        private price: number,
    ) {}

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    print(indent: string = ''): void {
        console.log(`${indent}- ${this.name}: $${this.price}`);
    }
}
