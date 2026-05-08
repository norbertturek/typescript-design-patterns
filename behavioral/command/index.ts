import { Document } from './receiver/document';
import { EditorInvoker } from './invoker/editor.invoker';
import { AddTextCommand } from './commands/add-text.command';
import { DeleteTextCommand } from './commands/delete-text.command';

const doc = new Document();
const editor = new EditorInvoker();

const print = () => console.log(`  → content: "${doc.getContent()}"\n`);

console.log('=== Executing commands ===\n');

editor.execute(new AddTextCommand(doc, 'Hello'));
print();

editor.execute(new AddTextCommand(doc, ', World'));
print();

editor.execute(new DeleteTextCommand(doc, 6));
print();

console.log('=== Undo x3 ===\n');

editor.undo();
print();

editor.undo();
print();

editor.undo();
print();

editor.undo(); // nothing left

console.log('\n=== Redo x2 ===\n');

editor.redo();
print();

editor.redo();
print();
