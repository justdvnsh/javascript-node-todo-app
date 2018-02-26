const fs = require('fs');

var fetchNotes = () => {
	try {
		var noteString = fs.readFileSync('notes-data.json')
		return JSON.parse(noteString)
	}catch (e){
		return [];
	}
}

var saveNotes = (note) => {
	return fs.writeFileSync('notes-data.json', JSON.stringify(note))
}

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	}

	var duplicateNotes = notes.filter((note) => note.title === title)

	if (duplicateNotes.length === 0){
		notes.push(note)
		saveNotes(notes);
		return notes
	} // if this statement is false, if block would not run and thus return undefined 
}

var listNote = () => {
	var list = fetchNotes();
	list.forEach((note) => {
		 return console.log('\n\nTitle:-',note.title, '\n\n', 'Body:-\t', note.body, '\n\n----------------------\n\n')
	})
}

var readNote = (title) => {
	var notes = fetchNotes();
	var listednotes = notes.filter((note) => {
		if (note.title === title){
			return note
		}
	});
	return listednotes[0]
}

var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => {
		if (note.title === title) {
		} else {
			return note
		}
	});
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length // to check whether note was removed or not

}

// since every node file has a global module object which has an exports property which exprots the thigns to be used by other modules and functions.
module.exports = {
	addNote, // ES6 syntax. Means same as :- addNote: addNote,
	listNote, // ES6 syntax. Means same as :- listNote: listNote,
	removeNote,
	readNote
}