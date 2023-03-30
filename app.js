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

app.use("/", indexRouter);

//Socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(3001, () => {
    console.log("Server is listning on port 3001");
});

io.on("connection", (socket) => {
    socket.on("message", (data) => {
        socket.broadcast.emit("message_recieve", data);
        socket.emit("message_send", data);
    });
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
