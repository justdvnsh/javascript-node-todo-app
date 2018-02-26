// core modules
const fs = require('fs');

// own modules
const notes = require('./notes.js');

// 3rd party
const _ = require('lodash');
const yargs = require('yargs');


const argv = yargs
	.command('add', 'Adds a note', {
		title: {
			describe: 'Title of the note',
			demand: true, // sets that title argument is needed to add a note.
			alias: 't' // we can use -t instead of --title to add a title
		},
		body: {
			describe: 'Body of the note',
			demand: true, // sets that title argument is needed to add a note.
			alias: 'b' // we can use -t instead of --title to add a title
		}
	})
	.command('list', 'Lists all the notes available')
	.command('remove', 'Removes the given note', {
		title: {
			describe: 'Give the title yoiu want to delete',
			demand: true,
			alias: 't'
		}
	})
	.command('read', 'Reads the given note', {
		title: {
			describe: 'Give the title yoiu want to read',
			demand: true,
			alias: 't'
		}
	})
	.help() // to get the help flag --help
	.argv;
var command = argv['_'][0] // just to get the arguments. Could also do the process.argv[2] since it returns an array unlike yargs which returns an objetc
//console.log(command)
//console.log('Command:',process.argv); // process is a global object which does not requires require funciton
//console.log('Yargs Commands', argv)

switch(command){
	case 'add': 
	var note = notes.addNote(argv.title, argv.body);
	if (note === undefined){
		console.log("A note already exists")
	} else {
		console.log("\n\n\t\t\tNote created...!\n\n------------------------------------------------------------------------------------\n\nTitle:-\t", argv.title,'\n\n', "Body:-\t", argv.body, '\n\n')
	}
	break;

	case 'list': notes.listNote();
	break;

	case 'read': 
	var note = notes.readNote(argv.title);
	if (note) {
		console.log("\n\nTitle:-\t\t",note.title,"\n\nBody:-\t\t",note.body,"\n\n")
	} else {
		console.log("\n\nNo note of that title exists\n\n------------------------------------------------------------------------------------")
	}
	
	break;

	case 'remove': 
	var note = notes.removeNote(argv.title);
	if (note){
		console.log("\n\n\t\t\tNote Removed...!\n\n------------------------------------------------------------------------------------\n\nTitle:-\t", argv.title,'\n\n')	
	} else{
		console.log("\n\n\t\t No note found of that title\n\n")
	}
	break;

	default: console.log('Command not recognised...!')
}
