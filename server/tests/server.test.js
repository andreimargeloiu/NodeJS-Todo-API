const expect = require ('expect');
const request = require ('supertest');

const {ObjectID} = require ('mongodb');
const {app} = require ('./../server.js');
const {Todo} = require ('./../models/todo');

// inainte ca fiecare test sa se execute, se executa bucata de cod de mai jos
// beforeEach((done) => {
// 	Todo.remove({}).then(() => {
// 		done();
// 	});
// });


const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo'
}];


beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});


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