const mysql = require("mysql");
const session = require("express-session");
const express = require("express");
const app = express();

const MySQLStore = require("express-mysql-session")(session);

const sql = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

const sessionConnection = mysql.createConnection(sql);
const sessionStore = new MySQLStore({
  expiration: 900000,
  createDatabseTable: true,
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
app.use(
  session({
    key: process.env.KEY,
    secret: process.env.SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);
module.exports = { sql, sessionStore };
