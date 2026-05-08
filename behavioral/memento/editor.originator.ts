import { EditorMemento } from './editor.memento';

export class Editor {
    private content: string = '';
    private cursorPosition: number = 0;

    type(text: string): void {
        this.content =
            this.content.slice(0, this.cursorPosition) +
            text +
            this.content.slice(this.cursorPosition);
        this.cursorPosition += text.length;
    }

    delete(length: number): void {
        const start = Math.max(0, this.cursorPosition - length);
        this.content = this.content.slice(0, start) + this.content.slice(this.cursorPosition);
        this.cursorPosition = start;
    }

    moveCursor(position: number): void {
        this.cursorPosition = Math.min(position, this.content.length);
    }

    save(): EditorMemento {
        return new EditorMemento(this.content, this.cursorPosition, new Date());
    }

    restore(memento: EditorMemento): void {
        this.content = memento.getContent();
        this.cursorPosition = memento.getCursorPosition();
    }

    getState(): string {
        return `"${this.content}" [cursor: ${this.cursorPosition}]`;
    }
}
