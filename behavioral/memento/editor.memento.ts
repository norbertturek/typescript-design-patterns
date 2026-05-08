export class EditorMemento {
    constructor(
        private readonly content: string,
        private readonly cursorPosition: number,
        private readonly timestamp: Date,
    ) {}

    getContent(): string { return this.content; }
    getCursorPosition(): number { return this.cursorPosition; }
    getTimestamp(): Date { return this.timestamp; }
}
