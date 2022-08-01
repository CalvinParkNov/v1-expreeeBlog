const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const account = require("./routes/account");
const ejs = require("ejs");
const _ = require("lodash");
const tasks = require("./routes/task");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

const sessionStore = new MySQLStore({
  expiration: 900000,
  createDatabaseTable: true,
  charset: "utf8mb4",
  schema: {
    tableName: "session_db",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

// const sessiondb = new MySQLStore(sessionStore);
// app.use(
//   session({
//     key: "session_cookie_name",
//     secret: "session_cookie_secret",
//     store: sessiondb,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", tasks);
app.use("/login", account);

const port = process.env.PORT;

app.listen(port || 5000, function () {
  console.log(`Server started on port ${port}`);
});
