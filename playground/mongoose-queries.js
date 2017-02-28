const {mongoose} = require('./../server/db/database.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');
const {ObjectID} = require('mongodb');

var id = '58b05a07c1c6f9263825a9e9';

User.findById(id).then((todo) => {
	console.log(JSON.stringify(todo, undefined, 2));
}).catch((err) => {
	console.log('An error occured.')
});


// if (! ObjectID.isValid(id)) {
// 	console.log('The id is not valid');
// }

// this returns an array with all objects that respect what you are looking for
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	if (todos.length === 0) {
// 		return console.log('No todos found.');
// 	}
// 	console.log(todos);
// });

// // this returns the first object that respect what you are looking for
// Todo.findOne({
// 	_id: id
// }).then((todos) => {
// 	if (! todos) {
// 		return console.log('No todos found.');
// 	}
// 	console.log(todos);
// });

// this returns the object with that id
// Todo.findById(id).then((todo) => {
// 	if (! todo) {
// 		return console.log('No todos found.');
// 	}
// 	console.log(todo);
// }).catch((err) => {
// 	console.log("Eroare.")
// });