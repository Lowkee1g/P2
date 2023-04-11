var express = require("express");
var session = require('express-session')
var router = express.Router();

// Bodyparser allows us to get data from ajax as json
var bodyParser = require('body-parser')
router.use(bodyParser.json())

// IMPORT CONTROLLERS
var player_controller = require("../controllers/playerController");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("lobby", { title: "Express", user: req.session.user});
});

// Route for setting username in session
router.post("/joinPlayer", async (req, res, next) => {
  // GET USERNAME FORM AJAX - lobby.js file
  console.log(req.body.data)
  // set session.user as username
  req.session.user = req.body.data
  res.send(JSON.stringify(req.session.user));
});

router.get("/user/:id", player_controller.getUserInformation)


module.exports = router;
