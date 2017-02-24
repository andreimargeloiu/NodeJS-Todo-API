// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
      if (err) {
            return console.log("Unable to connect to the MongoDB server");
      }
      console.log('Connected to MongoDB server');

      // findOneAndUpdate
      db.collection('Todos').findOneAndUpdate({
            name: 'Ioana'
      }, {
            $set: {
                  name: 'Andrei'
            },
            $inc: {
                  age: -6
            }
      }, {
            returnOriginal: false
      }).then ((result) => {
            console.log(JSON.stringify(result, undefined, 2));
      });

      // db.close();
});
