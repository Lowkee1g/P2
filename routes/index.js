var express = require("express");
var session = require('express-session')
var router = express.Router();

// Bodyparser allows us to get data from ajax as json
var bodyParser = require('body-parser')
router.use(bodyParser.json())


// IMPORT CONTROLLERS
var player_controller = require("../controllers/playerController");

/* GET home page. */
router.get("/lobby", async (req, res, next) => {
  console.log("user is lobby route: " + JSON.stringify(req.session));
  res.render("lobby", { title: "Express", user: req.session.user});
});

router.get("/", async (req, res, next) => {
  console.log("user is user route: " + JSON.stringify(req.session));
  res.render("index", { title: "Express", user: req.session.user});
});


router.get("/startGame", async (req, res, next) => {
    res.redirect('/')
});

// Route for setting username in session
router.post("/joinPlayer", async (req, res, next) => {
  // GET USERNAME FORM AJAX - lobby.js file
  // set session.user as username
  req.session.user = req.body.data
  req.session.save(function (err) {
    if (err) return next(err)
    res.send(JSON.stringify(req.session.user));
  })
  console.log("joinplayer session user is: " + req.session.user)
});

router.get("/user/:id", player_controller.getUserInformation)


module.exports = router;
