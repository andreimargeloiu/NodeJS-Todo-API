// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
      if (err) {
            return console.log("Unable to connect to the MongoDB server");
      }
      console.log('Connected to MongoDB server');

      // db.collection('Patients').insertOne({
      //       name: 'Ioana Kirley',
      //       score: 10
      // }, (err, result) => {
      //       if (err) {
      //             return comsole.log('unable to inert patient in the database');
      //       }
      //
      //       console.log('Patient succesfully inserted in the database');
      //       console.log(JSON.stringify(result.ops, undefined, 2));
      //       console.log(result.ops[0]._id.getTimestamp());
      // });

      db.close();
});
