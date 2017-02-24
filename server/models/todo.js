const mongoose = require ('mongoose');

var Todo = mongoose.model('Todo', {
      text: {
            type: String
      }
});

module.exports ={Todo};
