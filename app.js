const express = require("express");
const app = express();
var session = require('express-session')
const { v4: uuidv4 } = require('uuid')
// …

const createError = require("http-errors");
const path = require("path");

const indexRouter = require("./routes/index");

// Socket.io START - connect on port 8080
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });


io.on("connection", (socket) => {
  console.log('a user connected: ' + socket.id);

  // On player join send data to other users and the broadcaster
  socket.on("playerJoin", (player) => {
    socket.broadcast.emit("playerJoin", player);
    socket.emit("playerJoin", player);
});
});

server.listen(8080, () => {
    console.log("Server is listning on port: 8080");
});

// socket.io END

// Session START

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  genid: function(req) {
    return uuidv4();
  }, 
}))

// Session END

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);

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