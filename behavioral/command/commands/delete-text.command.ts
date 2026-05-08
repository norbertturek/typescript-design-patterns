import { Command } from '../core/command.interface';
import { Document } from '../receiver/document';

export class DeleteTextCommand implements Command {
    private deletedText: string = '';

    constructor(
        private document: Document,
        private length: number,
    ) {}

    execute(): void {
        this.deletedText = this.document.deleteLast(this.length);
        console.log(`[DeleteTextCommand] execute: deleted "${this.deletedText}"`);
    }

    undo(): void {
        this.document.append(this.deletedText);
        console.log(`[DeleteTextCommand] undo: restored "${this.deletedText}"`);
    }
}
