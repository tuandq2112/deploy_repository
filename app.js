var express = require("express");
var bodyParser = require("body-parser");
var Database = require("./db/database");
var routes = require("./routes/controller");

var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", routes);

app.listen(process.env.PORT || 5000, function () {
  console.log("Starting at port 5000");
});
