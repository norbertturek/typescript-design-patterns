export class Car {
    public seats: number = 0;
    public engine: string = '';
    public tripComputer: boolean = false;
    public gps: boolean = false;

    public listParts(): void {
        console.log(`Car with: ${this.seats} seats, ${this.engine} engine` +
            (this.tripComputer ? ', Trip Computer' : '') +
            (this.gps ? ', GPS' : ''));
    }
}
