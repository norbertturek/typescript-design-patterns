import { Prototype } from '../core/prototype.interface';

export class Rectangle implements Prototype<Rectangle> {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
    ) {}

    clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height, this.color);
    }

    describe(): void {
        console.log(`Rectangle — pos: (${this.x}, ${this.y}), size: ${this.width}x${this.height}, color: ${this.color}`);
    }
}
