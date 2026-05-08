import { Editor } from './editor.originator';
import { History } from './history.caretaker';

const editor = new Editor();
const history = new History(editor);

console.log('=== Typing ===\n');

editor.type('Hello');
console.log(`State: ${editor.getState()}`);
history.save();

editor.type(', World');
console.log(`State: ${editor.getState()}`);
history.save();

editor.type('!');
console.log(`State: ${editor.getState()}`);
history.save();

console.log('\n=== Deleting 8 chars ===\n');

editor.delete(8);
console.log(`State: ${editor.getState()}`);

console.log('\n=== Undo x3 ===\n');

history.undo();
console.log(`State: ${editor.getState()}`);

history.undo();
console.log(`State: ${editor.getState()}`);

history.undo();
console.log(`State: ${editor.getState()}`);

history.undo(); // nothing left
