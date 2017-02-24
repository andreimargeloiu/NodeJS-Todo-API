// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
      if (err) {
            return console.log("Unable to connect to the MongoDB server");
      }
      console.log('Connected to MongoDB server');

      // add more users
      // for (var i = 1; i <= 4; ++i) {
      //       db.collection('Todos').insert({
      //             text: 'Eat lunch',
      //             completed: false
      //       }).then((result) => {
      //             console.log(JSON.stringify(result.ops, undefined, 2));
      //       }, (err) => {
      //             console.log('Unable to insert more users');
      //       });
      // }

      db.collection('Todos').insertOne({
            text: 'Facebook',
            daysRemained: 5
      }).then((result) => {
            console.log('The object was created');
      });




      db.close();
});
