var mongoose = require("mongoose");

var loginSchema = mongoose.Schema({
  usernamelogin: {
    type: String,
    default: "loginxxx",
  },
  passwordlogin: {
    type: String,
    default: "Empty",
  }
});

module.exports = mongoose.model("login", loginSchema);
