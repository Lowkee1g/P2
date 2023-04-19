var express = require("express");
var session = require('express-session')
var router = express.Router();
const { v4: uuidv4 } = require('uuid')

// Bodyparser allows us to get data from ajax as json
var bodyParser = require('body-parser')
router.use(bodyParser.json())


// IMPORT CONTROLLERS
var player_controller = require("../controllers/playerController");

/* GET home page. */
router.get("/lobby", async (req, res, next) => {
  res.render("lobby", { title: "Express"});
});

router.get("/", async (req, res, next) => {
  var user = req.session.user;
  res.render("index", { title: "Express", user: user});
});

// router.get("/startGame", player_controller.getUserInformation);
router.get("/startGame", async (req, res, next) => {
    res.redirect('/');
});

// Route for setting username in session
router.post("/joinPlayer", async (req, res, next) => {
  req.session.user = req.body.data;
  player_controller.createPlayer(req, res);
});

router.get("/user/:id", player_controller.getUserInformation)

router.get("/userBuyProperty/:id", player_controller.buyProperty)
router.get("/userSellProperty/:id", player_controller.sellProperty)

module.exports = router;
