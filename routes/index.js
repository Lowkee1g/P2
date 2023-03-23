var express = require("express");
var router = express.Router();

var player_controller = require("../controllers/playerController");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express"});
});

router.get("/user/:id", player_controller.getUserInformation)


module.exports = router;
