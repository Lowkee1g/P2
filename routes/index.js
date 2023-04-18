var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index", { title: "Express" });
  });
router.get("/Property_card", (req, res, next) => {
    res.render("Property_cards", { title: "Express" });
});

module.exports = router;
