require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require ('lodash');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/database');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate.js');

var app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	console.log(id);

	if (! ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if (! todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((err) => {
		return res.status(404).send();
	})
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (! ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {
		$set: body
	}, {
		new: true // returneaza noul obiect in promise
	}).then((todo) => {
		if (! todo) {
			res.status(404).send();
		}
		console.log(todo);
		res.send({todo});
	}).catch((err) => {
		res.status(400).send();
	});
});

// put a new user in the database
app.post('/users', (req, res) => {
    var userAux = _.pick(req.body, ['email', 'password'])
    var user = new User(userAux);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send();
    });
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
