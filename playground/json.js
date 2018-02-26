const fs = require('fs');

var originalNote = {
	title : 'Some text goes here...!',
	body : 'Some text gies here...!'
}

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);
debugger; // to tell the debugging tool to stop here .
var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString)

console.log(typeof note);
console.log(note.body)