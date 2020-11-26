var mongoose = require('mongoose');
function toLocaleDateString(){
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return today.toLocaleDateString();
}
var billSchema = mongoose.Schema({
  addDate: {
    type: String,
    default: toLocaleDateString
  },
  roomName: {
    type: String,
    default: "Roomxxx",
  },
  userName: {
    type: String,
    default: "No Name",
  },
  Electricity_bill: {
    type: Number,
    default: 0,
  },
  Water_bill: {
    type: Number,
    default: 0,
  },
  Room_bill: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "Empty",
  },
  pay: {
    type: String,
    default: "unpaid",
  },
});

module.exports = mongoose.model('bill', billSchema);
