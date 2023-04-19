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

// Count number of players - Used in lobby.js to enable start button
let numberOfPlayers = 0;

io.on("connection", (socket) => {
  console.log('a user connected: ' + socket.id);

  // On player join send data to other users and the broadcaster
  socket.on("playerJoin", (player) => {

    numberOfPlayers+=1;
    socket.broadcast.emit("playerJoin", player, numberOfPlayers);
    socket.emit("playerJoin", player, numberOfPlayers);

  });

  socket.on("startGame", () => {
    socket.broadcast.emit("startGame");
    socket.emit("startGame");
  })
});

server.listen(8480, () => {
    console.log("Server is listning on port: 8480");
});

// socket.io END

// Session START
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
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