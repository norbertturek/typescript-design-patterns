import { EditorMemento } from './editor.memento';
import { Editor } from './editor.originator';

export class History {
    private snapshots: EditorMemento[] = [];

    constructor(private editor: Editor) {}

    save(): void {
        const memento = this.editor.save();
        this.snapshots.push(memento);
        console.log(`[History] Snapshot saved at ${memento.getTimestamp().toISOString()}`);
    }

    undo(): void {
        if (this.snapshots.length === 0) {
            console.log('[History] Nothing to undo');
            return;
        }
        const memento = this.snapshots.pop()!;
        this.editor.restore(memento);
        console.log(`[History] Restored snapshot from ${memento.getTimestamp().toISOString()}`);
    }

    get size(): number {
        return this.snapshots.length;
    }
}
