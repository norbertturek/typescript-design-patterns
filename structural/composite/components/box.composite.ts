import { OrderComponent } from '../core/component.interface';

export class Box implements OrderComponent {
    private children: OrderComponent[] = [];

    constructor(private name: string) {}

    add(component: OrderComponent): void {
        this.children.push(component);
    }

    remove(component: OrderComponent): void {
        this.children = this.children.filter(c => c !== component);
    }

    getName(): string {
        return this.name;
    }

    // rekurencyjnie sumuje ceny wszystkich dzieci
    getPrice(): number {
        return this.children.reduce((sum, child) => sum + child.getPrice(), 0);
    }

    print(indent: string = ''): void {
        console.log(`${indent}📦 ${this.name}: $${this.getPrice()}`);
        this.children.forEach(child => child.print(indent + '  '));
    }
}
