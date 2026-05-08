import { Command } from '../core/command.interface';
import { Document } from '../receiver/document';

export class AddTextCommand implements Command {
    constructor(
        private document: Document,
        private text: string,
    ) {}

    execute(): void {
        this.document.append(this.text);
        console.log(`[AddTextCommand] execute: appended "${this.text}"`);
    }

    undo(): void {
        this.document.deleteLast(this.text.length);
        console.log(`[AddTextCommand] undo: removed "${this.text}"`);
    }
}
