const expect = require ('expect');
const request = require ('supertest');

const {ObjectID} = require ('mongodb');
const {app} = require ('./../server.js');
const {Todo} = require ('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seeds/seed.js');
const {User} = require('./../models/user.js');
// inainte ca fiecare test sa se execute, se executa bucata de cod de mai jos
// beforeEach((done) => {
// 	Todo.remove({}).then(() => {
// 		done();
// 	});
// });

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /postodos', () => {
	it ('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({text}).then((todos) => {
                	expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
           		}).catch((e) => done(e));
			});
	});
});

describe ('GET /todos', () => {
	it ('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				done();
			});
	})
});

describe ('GET /todos/:id', () => {
	it ('should get a specific id', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it ('should return 404 if not found', (done) => {
		var hexId = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				done();
			})
	});

	it ('should return 404 for non-object ID', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				done();
			});
	})
});

describe('DELETE /todos/:id', () => {
	it ('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((err) => {
					done(err);
				});
			});
	});

	it ('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				done();
			})
	});

	it ('should return 404 if object ID is invalid', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				done();
			});
	});
});

describe('PATCH /todos/:id', () => {
	var hexId = todos[1]._id.toHexString();
	var text = 'Verificare patch din server.test';

	it ('should update the todo', (done) => {
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: true,
				text: text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toNotBeA('number');
			})
			.end(done);
	});

	it ('should clear completedAt when todo is not completed', (done) => {
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.completed).toBe(false);
			})
			.end(done);
	});
});

describe('GET /users/me', () => {
	it ('should return user if authentificated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			}).end(done);
	});

	it ('should return 401 if not authentificated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			}).end(done);
	});
});

describe('POST /users', () => {
	it ('should create a new user', (done) => {
		var email = 'example@eample.com';
		var password = '123mnb!';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			}).end(done);
	});

	it ('should return valdiation errors if request invalid', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'and',
				password: '123'
			})
			.expect(400)
			.end(done);
	});

	it ('should not create user if email in use', (done) => {
		request(app)
			.post('/users')
			.send({
				email: users[0].email,
				password: '123'
			})
			.expect(400)
			.end(done);
	});
});

describe('POST /users/login', () => {
	it ('should login user and return token', (done) => {
		request(app)
			.post('/users/login')
			.send({
			    email: users[1].email,
			    password: users[1].password
			})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens[0]).toInclude({
						access: 'auth',
						token: res.headers['x-auth']
					});
					done();
				}).catch((err) => done(err));
			});
	});

	it ('should reject invalid login', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: 'abromania@yahoo.com',
				password: '123124'
			})
			.expect(400)
			.expect((res) => {
				expect(res.headers['x-auth']).toNotExist();
			})
			.end((err, res) => {
				if (err) {
					return err;
				}
				User.findById(users[1]._id).then((user) => {
					expect(user.tokens.length).toBe(0);
					done();
				}).catch((err) => done(err));
			});
	});
});
