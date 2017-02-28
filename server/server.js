var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/database');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

// // here we receive the username and password from login
// app.post('/login', (req, res) => {
// 	var username = req.body.username;
// 	var password = req.body.password;

// 	if (username === 'admin' && password == 'adminpass')
// 		res.send('You are logged in');
// 	else res.send('Bad log in. Try again!');
// });

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) => {
		res.status(400).send(err);
	});
});

// get request cu parametrii
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (! ObjectID.isValid(id)) {
		console.log('The id requried is not valid');
		return res.status(404).send();
	 }
	console.log(id);

	Todo.findById(id).then((todo) => {
		if (! todo) {
			console.log('The todo with this id is not in the database');
			res.status(404).send();
		}
		//console.log(JSON.stringify(todo, undefined, 2));
		res.send({todo});
	}).catch((err) => {
		console.log('An error occured');
		res.status(400).send();
	});
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
