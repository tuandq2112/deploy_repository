var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userName: {
        type: String,
        default: 'No Name'
    },
    userAge: {
        type: Number,
        default: 0
    },
    userAddress:{
      type: String,
      default: 'No Address'
    },
    idCardNumber:{
      type: String,
      default: 'xxxxxxxxx'
    },
    phoneAddress:{
      type: String,
      default: 'No phone address'
    },
    roomName:{
      type: String,
      default: 'Roomxxx'
    },
});

module.exports = mongoose.model('user', userSchema);
