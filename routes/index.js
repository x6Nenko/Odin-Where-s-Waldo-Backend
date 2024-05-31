const express = require('express');
const router = express.Router();
const character_controller = require("../controllers/characterController");
const toptime_controller = require("../controllers/topTimeController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/check", character_controller.check_post);

router.post("/toptime", toptime_controller.newtt_post);

router.get("/toptime", toptime_controller.alltt_get);

router.get("/start", toptime_controller.start_timer);

router.get("/end", toptime_controller.end_timer);


module.exports = router;
