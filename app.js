const express = require("express");
const app = express();
var mysql = require("mysql");
// …

const createError = require("http-errors");
const path = require("path");

const indexRouter = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);

//sql connection
var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;