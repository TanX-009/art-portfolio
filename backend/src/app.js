const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const session = require("express-session");

const index = require("./routes/index.routes");
const { initSqlite } = require("./sqlite");

let app = express();

// use sessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/v1/images", express.static("images"));

// index router
app.use("/v1", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

initSqlite();

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({ error: err });
});

module.exports = app;
