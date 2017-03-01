const mongoose = require ('mongoose');

var Todo = mongoose.model('Todo', {
      text: {
            type: String
      },
      completed: {
      	  	type: Boolean,
      	  	default: false
      },
      completedAt: {
      		type: String
      }
});

module.exports ={Todo};
