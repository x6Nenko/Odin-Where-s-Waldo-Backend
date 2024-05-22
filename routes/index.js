const express = require('express');
const router = express.Router();
const character_controller = require("../controllers/characterController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// CHARACTER ROUTES

// // GET request to get all game characters
// router.get("/characters", user_controller.users_get);

// // GET request for one character
// router.get("/characters/:characterid", user_controller.user_detail);

// POST request to check if coordinates are correct
router.post("/check", character_controller.check_post);


module.exports = router;
