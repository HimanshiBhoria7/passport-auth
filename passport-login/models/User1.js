const mongoose = require('mongoose');

const User1Schema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  leave : {
    type: Date,
  },
  purpose : {
    type : String,
  }
});


const User1 = mongoose.model('User1', User1Schema);

module.exports = User1;
