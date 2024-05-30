const Game = require("../models/Game");
const TopTime = require("../models/TopTime");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.alltt_get = asyncHandler(async (req, res, next) => {
  const allTopTimes = await TopTime.find().exec();
  return res.json({ toptimes: allTopTimes }); 
});


exports.newtt_post = [
  body("username", "Username must be between 1 - 20 characters")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
  body("toptime", "Can't be null")
    .trim()
    .escape(),
  body("game", "Can't be null")
    .trim()
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const gameData = await Game.findOne({name: req.body.game}).exec();

    // Create a user object with escaped and trimmed data.
    const toptime = new TopTime({ 
      username: req.body.username,
      time: req.body.toptime,
      game: gameData._id,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(400).json({
        msg: "Something is wrong",
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      await toptime.save();
      res.json({
        msg: "Top time saved"
      });
    }
  }),
];