const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();
const bodyParser = require("body-parser");
const account = require("./routes/account");
const ejs = require("ejs");
const _ = require("lodash");
const tasks = require("./routes/task");
const compose = require("./routes/post");
const comment = require("./routes/comment");
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", tasks);
app.use("/login", account);
app.use("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});
app.use("/comment", comment);
app.use("/post", compose);

const port = process.env.PORT;

app.listen(port || 5000, function () {
  console.log(`Server started on port ${port}`);
});
