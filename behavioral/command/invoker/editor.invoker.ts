import { Command } from '../core/command.interface';

export class EditorInvoker {
    private history: Command[] = [];
    private redoStack: Command[] = [];

    execute(command: Command): void {
        command.execute();
        this.history.push(command);
        this.redoStack = [];
    }

    undo(): void {
        const command = this.history.pop();
        if (!command) {
            console.log('[EditorInvoker] Nothing to undo');
            return;
        }
        command.undo();
        this.redoStack.push(command);
    }

    redo(): void {
        const command = this.redoStack.pop();
        if (!command) {
            console.log('[EditorInvoker] Nothing to redo');
            return;
        }
        command.execute();
        this.history.push(command);
    }
}
