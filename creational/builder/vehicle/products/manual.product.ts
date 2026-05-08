export class Manual {
    public content: string = 'Manual for Car: \n';

    public listParts(): void {
        console.log(`Manual content: \n${this.content}`);
    }
}
