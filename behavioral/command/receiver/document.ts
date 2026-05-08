export class Document {
    private content: string = '';

    append(text: string): void {
        this.content += text;
    }

    deleteLast(length: number): string {
        const deleted = this.content.slice(-length);
        this.content = this.content.slice(0, -length);
        return deleted;
    }

    getContent(): string {
        return this.content;
    }
}
