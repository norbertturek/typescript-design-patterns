import { Prototype } from '../core/prototype.interface';

export class Circle implements Prototype<Circle> {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
    ) {}

    clone(): Circle {
        return new Circle(this.x, this.y, this.radius, this.color);
    }

    describe(): void {
        console.log(`Circle — pos: (${this.x}, ${this.y}), radius: ${this.radius}, color: ${this.color}`);
    }
}
