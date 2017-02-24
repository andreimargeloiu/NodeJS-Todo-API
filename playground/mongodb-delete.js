// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
      if (err) {
            return console.log("Unable to connect to the MongoDB server");
      }
      console.log('Connected to MongoDB server');

      // deleteMany
      // db.collection('Todos').deleteMany({
      //       text: 'Eat lunch'
      // }).then((result) => {
      //       console.log(result);
      // });

      // deleteOne
      // db.collection('Todos').deleteOne({
      //       text: 'Facebook'
      // }).then ((result) => {
      //       console.log('The iten was deleted');
      // }, (err) => {
      //       console.log('An error occured');
      // });

      // findOneAndDelete
      // db.collection('Todos').findOneAndDelete({
      //       name: 'Andrei'
      // }).then((result) => {               // in variabila result imi va pune elemnetul gasit si sters
      //       console.log(result);
      // });

      // delete a specific ID
      db.collection('Todos').deleteOne({
            _id: new ObjectID("58affbf7bb94ca159c39755b")
      });

      // db.close();
});
