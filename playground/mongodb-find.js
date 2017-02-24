// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
      if (err) {
            return console.log("Unable to connect to the MongoDB server");
      }
      console.log('Connected to MongoDB server');

      db.collection('Todos').find({
            _id: new ObjectID('58ae045a92943224e406e2b5'),
            name: 'Andrei'
      }).toArray().then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
      }, (err) => {
            console.log("Unable to fetch data");
      });

      // add more users
      db.collection('Todos').insert([{
            name: 'Ioana',
            age: 19
      }, {
            name: 'Alexandra',
            age: 19
      }, {
            name: 'Andrei',
            age: 35
      }, {
            name: 'Andrei',
            age: 57
      }]).then((result) => {
            console.log(JSON.stringify(result.ops, undefined, 2));
      }, (err) => {
            console.log('Unable to insert more users');
      });

      db.collection('Todos').find({name: 'Andrei'}).count().then((count) => {
            console.log(`There are ${count} objects with the name \`Andrei\``);
      }, (err) => {
            console.log("Unable to fetch data");
      });


      db.close();
});
