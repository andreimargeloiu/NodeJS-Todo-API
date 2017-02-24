const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require ('./db/database.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
      var todo = new Todo({
            text: req.body.text
      });

      console.log(todo);

      todo.save().then((doc) => {
            res.send(doc);
      }, (err) => {
            res.status(400).end(err);
      });
});


app.listen(3000, () => {
      console.log('App is now live on port 3000');
});
