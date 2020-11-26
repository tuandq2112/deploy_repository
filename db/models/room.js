var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    roomName:{
      type: String,
      default: 'Roomxxx'
    },
    status:{
      type: String,
      default: 'Empty'
    }

});

module.exports = mongoose.model('room', roomSchema);
