var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var port = 80;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", function(req, res) {
  res.send("JOBBEY working");
});

app.post("/", function(req, res) {
  res.send("JOBBEY working POST");
});

app.listen(port);