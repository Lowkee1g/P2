const express = require("express");
const app = express();
var session = require('express-session')
const { v4: uuidv4 } = require('uuid')
// …


const createError = require("http-errors");
const path = require("path");

const indexRouter = require("./routes/index");

// Socket.io START - connect on port 7070
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

// array to store players and socket id
let players = [];



// Count number of players - Used in lobby.js to enable start button
let numberOfPlayers = 0;

//TODO: fix number of players ONLY if they have joined the game

io.on("connection", (socket) => {
  console.log('a user connected: ' + socket.id);
  // On player join send data to other users and the broadcaster
  socket.on("playerJoin", (player) => {
    // Add player to array with socket id
    players.push({player: player, socketId: socket.id});
    numberOfPlayers+=1;

    socket.broadcast.emit("playerJoin", player, numberOfPlayers);
    socket.emit("playerJoin", player, numberOfPlayers);
    console.log(numberOfPlayers);

  });

  // When a player leaves the page, disconnect the socket
  socket.on("disconnect", () => {
    numberOfPlayers--;
    console.log("user disconnected: " + socket.id);

    // Find the player in the array and remove it
    for (let i = 0; i < players.length; i++) {
      if(players[i].socketId == socket.id) {
        console.log(players[i].player);
        
        // Emit to other users that a player has left
        socket.broadcast.emit("playerDisconnect", players[i].player, numberOfPlayers);
        socket.emit("playerDisconnect", players[i].player, numberOfPlayers);

        // Remove player from array
        players.splice(i, 1);
      }
    }
  });

  socket.on("startGame", () => {
    socket.broadcast.emit("startGame");
    socket.emit("startGame");
  })

  socket.on("message", (data) => {
    socket.broadcast.emit("message_recieve", data);
    socket.emit("message_send", data);
  });
});

server.listen(7070, () => {
    console.log("Server is listning on port: 7070");
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

/*
app.post('/api/charge-rent', (req, res) => {
  const player = req.body.player;
  const tile = req.body.tile;
  console.log("Charge rent Resived");

  chargeRent(player, tile);

  res.sendStatus(200);
});
*/
module.exports = app;