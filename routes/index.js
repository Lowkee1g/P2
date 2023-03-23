var express = require("express");
var router = express.Router();

var player_controller = require("../controllers/playerController");

/* GET home page. */
// router.get("/", async (req, res, next) => {
  // res.render("index", { title: "Express", id: 1});
// });

router.get("/", player_controller.index)
router.get("/user/:id", player_controller.getUserInformation)


module.exports = router;
