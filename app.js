const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const tasks = require("./routes/task");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", tasks);
const port = process.env.PORT;

app.listen(port || 5000, function () {
  console.log(`Server started on port ${port}`);
});
