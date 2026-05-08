export class House {
    public walls: string = '';
    public roof: string = '';
    public garden: boolean = false;
    public pool: boolean = false;

    public describe(): void {
        console.log(`House: ${this.walls} walls, ${this.roof} roof` +
            (this.garden ? ', Garden' : '') +
            (this.pool ? ', Pool' : ''));
    }
}
