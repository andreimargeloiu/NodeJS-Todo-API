const {mongoose} = require('./../server/db/database.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');
const {ObjectID} = require('mongodb');

// Todo.remove({}) -> removes everything from colleecetion
//				   -> we don't get the removed items
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('58b56ed5b8dea54352da2de5').then((todo) => {
	console.log(todo);
});